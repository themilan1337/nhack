<template>
  <section ref="sectionRef" class="relative min-h-screen overflow-hidden">
    <!-- Background SVG -->
    <div class="absolute inset-0 z-0 flex justify-center items-center">
      <img 
        ref="backgroundRef"
        src="/background.svg" 
        alt="Background" 
        class="max-w-[80%] max-h-[80%] object-contain"
      />
    </div>
    
    <!-- Content Container -->
    <div class="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 py-16">
      <!-- Main Heading -->
      <div class="text-center mb-16 max-w-4xl">
        <h1 ref="headingRef" class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight">
          Challenging coding to make<br>
          the Astana's traffic jams<br>
          more understandable
        </h1>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

// Template refs
const sectionRef = ref(null)
const headingRef = ref(null)
const backgroundRef = ref(null)

// Animation timeline
let tl = null

onMounted(() => {
  if (process.client && sectionRef.value) {
    // Set initial states
    gsap.set(headingRef.value, {
      opacity: 0,
      y: 50
    })
    
    gsap.set(backgroundRef.value, {
      opacity: 0,
      scale: 0.8
    })
    
    // Create timeline with ScrollTrigger
    tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })
    
    // Animate background first
    tl.to(backgroundRef.value, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power2.out"
    })
    
    // Then animate heading
    tl.to(headingRef.value, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.6")
  }
})

onUnmounted(() => {
  // Clean up ScrollTrigger instances
  if (tl) {
    tl.kill()
  }
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<style scoped>
/* Additional custom styles if needed */
</style>