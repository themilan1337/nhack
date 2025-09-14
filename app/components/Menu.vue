<template>
  <nav class="menu-nav">
    <div class="menu-bar">
      <div class="menu-toggle-btn" @click="toggleMenu" :class="{ 'menu-open': isMenuOpen }">
        <div class="menu-toggle-label"><p>Menu</p></div>
        <div class="menu-hamburger-icon" :class="{ active: isMenuOpen }">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <div class="menu-overlay" :class="{ active: isMenuOpen }">
      <div class="menu-overlay-content">
        <div class="menu-media-wrapper">
          <img src="/hero-img.jpg" alt="Menu background" />
        </div>
        <div class="menu-content-wrapper">
          <div class="menu-content-main">
            <div class="menu-col">
              <div class="menu-link hover:underline"><NuxtLink to="/" @click="closeMenu">Home</NuxtLink></div>
              <div class="menu-link hover:underline"><NuxtLink to="/about" @click="closeMenu">About</NuxtLink></div>
              <div class="menu-link hover:underline"><NuxtLink to="/services" @click="closeMenu">Services</NuxtLink></div>
              <div class="menu-link hover:underline"><NuxtLink to="/contact" @click="closeMenu">Contact</NuxtLink></div>
            </div>

            <div class="menu-col">
              <div class="menu-tag hover:underline"><a href="#">Transportation</a></div>
              <div class="menu-tag hover:underline"><a href="#">Technology</a></div>
              <div class="menu-tag hover:underline"><a href="#">Innovation</a></div>
            </div>
          </div>
          <div class="menu-footer">
            <div class="menu-col">
              <p>Astana, Kazakhstan</p>
            </div>
            <div class="menu-col">
              <p>+7 777 123 4567</p>
              <p>hello@indrive.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'

let SplitText

const isMenuOpen = ref(false)
const isAnimating = ref(false)
let splitTextByContainer = []
let menuOverlay = null
let menuOverlayContainer = null
let menuMediaWrapper = null
let menuToggleLabel = null

// Dynamically import SplitText
if (process.client) {
  import('gsap/SplitText').then((module) => {
    SplitText = module.SplitText
    gsap.registerPlugin(SplitText)
  })
}

const toggleMenu = () => {
  if (isAnimating.value) return

  if (!isMenuOpen.value) {
    openMenu()
  } else {
    closeMenu()
  }
}

const openMenu = () => {
  isAnimating.value = true
  isMenuOpen.value = true

  const tl = gsap.timeline()

  tl.to(menuToggleLabel, {
    y: "-110%",
    duration: 1,
    ease: "power4.inOut",
  })
  .to(menuOverlay, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1,
    ease: "power4.inOut",
  }, "<")
  .to(menuOverlayContainer, {
    yPercent: 0,
    duration: 1,
    ease: "power4.inOut",
  }, "<")
  .to(menuMediaWrapper, {
    opacity: 1,
    duration: 0.75,
    ease: "power2.out",
    delay: 0.5,
  }, "<")

  if (splitTextByContainer.length > 0) {
    splitTextByContainer.forEach((containerSplits) => {
      const copyLines = containerSplits.flatMap((split) => split.lines)
      tl.to(copyLines, {
        y: "0%",
        duration: 2,
        ease: "power4.inOut",
        stagger: -0.075,
      }, -0.15)
    })
  }

  tl.call(() => {
    isAnimating.value = false
  })
}

const closeMenu = () => {
  isAnimating.value = true
  isMenuOpen.value = false

  const tl = gsap.timeline()

  tl.to(menuOverlay, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    duration: 1,
    ease: "power4.inOut",
  })
  .to(menuOverlayContainer, {
    yPercent: -50,
    duration: 1,
    ease: "power4.inOut",
  }, "<")
  .to(menuToggleLabel, {
    y: "0%",
    duration: 1,
    ease: "power4.inOut",
  }, "<")

  tl.call(() => {
    if (splitTextByContainer.length > 0) {
      splitTextByContainer.forEach((containerSplits) => {
        const copyLines = containerSplits.flatMap((split) => split.lines)
        gsap.set(copyLines, { y: "-110%" })
      })
    }

    gsap.set(menuMediaWrapper, { opacity: 0 })
    isAnimating.value = false
  })
}

const initializeSplitText = async () => {
  if (process.client && !SplitText) {
    const module = await import('gsap/SplitText')
    SplitText = module.SplitText
    gsap.registerPlugin(SplitText)
  }

  if (SplitText) {
    const textContainers = document.querySelectorAll('.menu-col')
    splitTextByContainer = []

    textContainers.forEach((container) => {
      const textElements = container.querySelectorAll('a, p')
      let containerSplits = []

      textElements.forEach((element) => {
        const split = SplitText.create(element, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'line',
        })
        containerSplits.push(split)
        gsap.set(split.lines, { y: '-110%' })
      })

      splitTextByContainer.push(containerSplits)
    })
  }
}

onMounted(async () => {
  await nextTick()
  
  menuOverlay = document.querySelector('.menu-overlay')
  menuOverlayContainer = document.querySelector('.menu-overlay-content')
  menuMediaWrapper = document.querySelector('.menu-media-wrapper')
  menuToggleLabel = document.querySelector('.menu-toggle-label p')

  await initializeSplitText()
})

onUnmounted(() => {
  if (splitTextByContainer.length > 0) {
    splitTextByContainer.forEach((containerSplits) => {
      containerSplits.forEach((split) => {
        if (split.revert) split.revert()
      })
    })
  }
})
</script>

<style scoped>
.menu-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  overflow: hidden;
  z-index: 99999;
}

.menu-bar {
  position: fixed;
  top: 0;
  right: 0;
  padding: 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  pointer-events: all;
  color: #5f5f5f;
  z-index: 100001;
  gap: 1rem;
}

.menu-toggle-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}

.menu-toggle-label {
  overflow: hidden;
}

.menu-toggle-label p {
  position: relative;
  transform: translateY(0%);
  will-change: transform;
  font-size: 0.95rem;
  font-weight: 500;
  color: white;
  transition: color 0.3s ease;
}

.menu-toggle-btn.menu-open .menu-toggle-label p {
  color: #333;
}

.menu-hamburger-icon {
  position: relative;
  width: 3rem;
  height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 100%;
  transition: border-color 0.3s ease;
}

.menu-toggle-btn.menu-open .menu-hamburger-icon {
  border-color: rgba(51, 51, 51, 0.3);
}

.menu-hamburger-icon span {
  position: absolute;
  width: 15px;
  height: 1.25px;
  background-color: white;
  transition: all 0.75s cubic-bezier(0.87, 0, 0.13, 1);
  transform-origin: center;
  will-change: transform;
}

.menu-toggle-btn.menu-open .menu-hamburger-icon span {
  background-color: #333;
}

.menu-hamburger-icon span:nth-child(1) {
  transform: translateY(-3px);
}

.menu-hamburger-icon span:nth-child(2) {
  transform: translateY(3px);
}

.menu-hamburger-icon.active span:nth-child(1) {
  transform: translateY(0) rotate(45deg) scaleX(1.05);
}

.menu-hamburger-icon.active span:nth-child(2) {
  transform: translateY(0) rotate(-45deg) scaleX(1.05);
}

.menu-overlay,
.menu-overlay-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: #333;
  overflow: hidden;
  z-index: 100000;
}

.menu-overlay {
  background-color: white;
  clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
  will-change: clip-path;
}

.menu-overlay-content {
  display: flex;
  transform: translateY(-50%);
  will-change: transform;
  pointer-events: all;
}

.menu-media-wrapper {
  flex: 2;
  opacity: 0;
  will-change: opacity;
}

.menu-media-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.menu-content-wrapper {
  flex: 3;
  position: relative;
  display: flex;
}

.menu-content-main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.menu-footer {
  margin: 0 auto;
}

.menu-content-main,
.menu-footer {
  width: 75%;
  padding: 2rem;
  display: flex;
  align-items: flex-end;
  gap: 2rem;
}

.menu-col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-col:nth-child(1) {
  flex: 3;
}

.menu-col:nth-child(2) {
  flex: 2;
}

.menu-link a {
  font-size: 3.5rem;
  font-weight: 500;
  line-height: 1.2;
  text-decoration: none;
  color: #333;
  font-family: 'Epilogue', sans-serif;
}

.menu-tag a {
  color: #5f5f5f;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
}

.menu-footer p {
  color: #5f5f5f;
  font-size: 0.95rem;
  font-weight: 500;
}

.line {
  position: relative;
  will-change: transform;
}

@media (max-width: 1000px) {
  .menu-media-wrapper {
    display: none;
  }

  .menu-content-main,
  .menu-footer {
    width: 100%;
  }

  .menu-content-main {
    top: 50%;
    flex-direction: column;
    align-items: flex-start;
    gap: 5rem;
  }

  .menu-link a {
    font-size: 3rem;
  }

  .menu-tag a {
    font-size: 1.25rem;
  }

  .menu-bar {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .menu-bar {
    top: 1rem;
    right: 1rem;
    padding: 0;
  }

  .menu-hamburger-icon {
    width: 2.5rem;
    height: 2.5rem;
  }

  .menu-link a {
    font-size: 2.5rem;
  }
}
</style>