<template>
  <!-- Menu Component -->
  <Menu />
  
  <div class="preloader-progress">
    <div class="preloader-progress-bar"></div>
    <div class="preloader-logo"><h1 class="epilogue">inDrive</h1></div>
  </div>

  <div class="preloader-mask"></div>

  <!-- Hero Video Section -->
  <div class="relative w-full h-screen max-h-screen !p-4 bg-white z-[100]">
    <video 
      src="/assets/hero.mp4"
      loop
      autoplay
      muted
      playsinline
      preload="auto"
      class="w-full h-full object-cover rounded-2xl"
    ></video>
    
    <div class="absolute inset-4 bg-black/70 rounded-2xl pointer-events-none"></div>
    
    <!-- Logo at Top -->
    <div class="absolute top-8 left-8 md:top-12 md:left-12 z-10 pointer-events-none">
      <img src="/image.svg" alt="inDrive Logo" class="h-10 md:h-14 w-auto" />
    </div>
    
    <!-- Text Overlay -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div class="text-center px-4 md:px-8 lg:px-16 mt-16 md:mt-20 lg:mt-24">
        <h1 class="hero-text text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-2xl leading-tight">
          Welcome to the future<br>of smart 
          <span class="relative inline-block">
            transportation
            <svg 
              class="hero-line absolute top-0 left-0 w-full h-full pointer-events-none" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 608 100" 
              fill="none"
              preserveAspectRatio="none"
            >
              <path 
                d="M322.902 98.9997C232.515 99.0422 140.637 94.7899 58.0275 80.853C31.532 76.3775 2.92086 69.1167 1.08733 58.1139C-0.222339 50.1514 13.3981 42.965 28.5701 37.4583C61.2714 25.5944 103.362 18.1423 146.239 12.7206C228.606 2.3131 316.878 -1.23755 403.155 2.36627C456.307 4.58809 509.519 9.62707 555.338 20.109C581.41 26.0728 606.777 35.279 606.999 46.8453C607.12 53.7659 597.831 60.3569 584.835 65.1939C571.839 70.0309 555.398 73.3158 538.675 76.0266C463.097 88.252 379.057 89.8891 297.011 91.3668" 
                stroke="#C0F11C" 
                stroke-width="5" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                class="hero-line-path"
              />
            </svg>
          </span>
          in Kazakhstan
        </h1>
        <p class="text-lg md:text-xl text-white/80 mt-6 max-w-2xl mx-auto">
          Revolutionizing urban mobility with cutting-edge technology and data-driven insights
        </p>
      </div>
    </div>
  </div>
  
  <!-- Features Section -->
  <section class="bg-white py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose inDrive</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">Leading the transformation of transportation with innovative solutions and user-centric design</p>
      </div>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
          <div class="w-16 h-16 bg-[#C0F11C] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Reliable Service</h3>
          <p class="text-gray-600">24/7 availability with guaranteed pickup times and professional drivers</p>
        </div>
        
        <div class="text-center p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
          <div class="w-16 h-16 bg-[#C0F11C] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Fair Pricing</h3>
          <p class="text-gray-600">Transparent pricing with no hidden fees and competitive rates</p>
        </div>
        
        <div class="text-center p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
          <div class="w-16 h-16 bg-[#C0F11C] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Smart Technology</h3>
          <p class="text-gray-600">AI-powered route optimization and real-time traffic analysis</p>
        </div>
      </div>
    </div>
  </section>
  
  <!-- CTA Section -->
  <section class="bg-black text-white py-20 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Journey?</h2>
      <p class="text-xl text-gray-300 mb-8">Join millions of users who trust inDrive for their daily transportation needs</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button class="bg-[#C0F11C] text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#a8d919] transition-colors duration-300">
          Download App
        </button>
        <button class="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-colors duration-300">
          Learn More
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import gsap from "gsap";
import { onMounted } from "vue";
import Menu from "~/components/Menu.vue";

let SplitText;

// Dynamically import and register SplitText plugin only on client-side
if (process.client) {
  import('gsap/SplitText').then((module) => {
    SplitText = module.SplitText;
    gsap.registerPlugin(SplitText);
  });
}

onMounted(async () => {
  // Wait for SplitText to be loaded
  if (process.client && !SplitText) {
    const module = await import('gsap/SplitText');
    SplitText = module.SplitText;
    gsap.registerPlugin(SplitText);
  }

  if (typeof document !== 'undefined' && document.fonts) {
    document.fonts.ready.then(() => {
      function createSplitTexts(elements) {
        const splits = {};

        elements.forEach(({ key, selector, type }) => {
          const config = { type, mask: type };

          if (type === "chars") config.charsClass = "char";
          if (type === "lines") config.linesClass = "line";
          splits[key] = SplitText.create(selector, config);
        });

        return splits;
      }

      const splitElements = [
        { key: "logoChars", selector: ".preloader-logo h1", type: "chars" },
        { key: "heroTextChars", selector: ".hero-text", type: "chars" },
      ];

      const splits = createSplitTexts(splitElements);

      gsap.set([splits.logoChars.chars], { x: "100%" });
      gsap.set([splits.heroTextChars.chars], { opacity: 0, y: 50 });
      
      // Set line animation initial state
      const heroLinePath = document.querySelector('.hero-line-path');
      if (heroLinePath) {
        const pathLength = heroLinePath.getTotalLength();
        gsap.set(heroLinePath, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength
        });
      }

      function animateProgress(duration = 4) {
        const tl = gsap.timeline();
        
        tl.to(".preloader-progress-bar", {
          width: "100%",
          duration: duration,
          ease: "power2.out",
        })
        .to(splits.logoChars.chars, {
          x: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power4.out",
        }, "-=3")
        .to(".preloader-progress, .preloader-mask", {
          yPercent: -100,
          duration: 1.5,
          ease: "power4.inOut",
        })
        .to(splits.heroTextChars.chars, {
          opacity: 1,
          y: 0,
          stagger: 0.02,
          duration: 1.5,
          ease: "power4.out",
        }, "-=0.5");
        
        // Animate the line
        if (heroLinePath) {
          tl.to(heroLinePath, {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.out",
          }, "-=1");
        }
      }

      animateProgress();
    });
  }
});
</script>

<style scoped>
/* Preloader styles */
.preloader-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.preloader-progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background-color: #C0F11C;
  z-index: 10001;
}

.preloader-logo {
  position: relative;
  z-index: 10002;
}

.preloader-logo h1 {
  font-size: 4rem;
  font-weight: 700;
  color: #000;
  font-family: 'Epilogue', sans-serif;
}

.preloader-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #C0F11C;
  z-index: 9999;
}

.char {
  display: inline-block;
  overflow: hidden;
}

.hero-line-path {
  filter: drop-shadow(0 0 10px rgba(192, 241, 28, 0.5));
}

@media (max-width: 768px) {
  .preloader-logo h1 {
    font-size: 2.5rem;
  }
}
</style>