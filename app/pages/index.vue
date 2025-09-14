<template>
  <!-- Preloader -->
  <div class="preloader-progress">
    <div class="preloader-progress-bar"></div>
    <div class="preloader-logo">
      <h1>inDrive</h1>
    </div>
  </div>

  <div class="preloader-mask"></div>

  <!-- Main Content -->
  <div class="main-container" :class="{ 'loaded': isLoaded }">

    <div class="!p-4 w-screen h-screen">
        <video 
            src="/assets/hero.mp4"
            loop
            autoplay
            muted
            playsinline
            preload="auto"
            class="w-full h-full object-cover rounded-2xl"
        ></video>
    </div>

    <!-- Mapbox Container -->
    <div id="map" class="map-container"></div>
    
    <!-- Storytelling Overlay -->
    <MapboxStorytelling 
      :config="storyConfig" 
      :map-instance="mapInstance"
      @chapter-change="handleChapterChange"
      @map-move="handleMapMove"
    />
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxStorytelling from '~/components/MapboxStorytelling.vue'
import { astanaStoryConfig } from '~/data/storytelling-config'

// Mapbox access token from nuxt config
mapboxgl.accessToken = 'pk.eyJ1IjoibWlsYW4xMzM3IiwiYSI6ImNtZmliNGw1NjBqMHUya3F3N2ZlYmI4dGkifQ.1wSnZEu14y4snJroP8xOYA'

// Reactive state
const isLoaded = ref(false)
const mapInstance = ref(null)
const storyConfig = ref(astanaStoryConfig)

// Preloader animation
const initPreloader = () => {
  function animateProgress(duration = 4) {
    const tl = gsap.timeline()
    const counterSteps = 5
    let currentProgress = 0

    for (let i = 0; i < counterSteps; i++) {
      const finalStep = i === counterSteps - 1
      const targetProgress = finalStep
        ? 1
        : Math.min(currentProgress + Math.random() * 0.3 + 0.1, 0.9)
      currentProgress = targetProgress

      tl.to('.preloader-progress-bar', {
        scaleX: targetProgress,
        duration: duration / counterSteps,
        ease: 'power2.out'
      })
    }

    return tl
  }

  // Preloader animation timeline
  const tl = gsap.timeline({ delay: 0.5 })

  tl.to('.preloader-logo h1', {
    scale: 1.1,
    duration: 1,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: 1
  })
    .add(animateProgress(), '0.25')
    .set('.preloader-progress', { backgroundColor: '#fff' })
    .to('.preloader-logo h1', {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: 'power4.inOut'
    }, '-=0.5')
    .to('.preloader-progress', {
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out'
    }, '-=0.25')
    .to('.preloader-mask', {
      scale: 6,
      duration: 2.5,
      ease: 'power3.out',
      onComplete: () => {
        isLoaded.value = true
        initMap()
      }
    }, '<')
}

// Initialize Mapbox map
const initMap = () => {
  mapInstance.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: astanaStoryConfig.chapters[0].location.center,
    zoom: astanaStoryConfig.chapters[0].location.zoom,
    pitch: astanaStoryConfig.chapters[0].location.pitch || 0,
    bearing: astanaStoryConfig.chapters[0].location.bearing || 0,
    antialias: true
  })

  const map = mapInstance.value
  if (!map) return
  
  map.on('load', () => {
    const loadedMap = mapInstance.value
    if (!loadedMap) return
    
    // Add 3D buildings layer
    loadedMap.addLayer({
      id: 'buildings-3d',
      source: 'composite',
      'source-layer': 'building',
      filter: ['==', 'extrude', 'true'],
      type: 'fill-extrusion',
      minzoom: 15,
      paint: {
        'fill-extrusion-color': '#aaa',
        'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'height']
        ],
        'fill-extrusion-base': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'min_height']
        ],
        'fill-extrusion-opacity': 0.6
      }
    })

    // Add custom layers for storytelling
    addCustomLayers()
  })

  // Disable map rotation using right click + drag
  map.dragRotate.disable()
  
  // Disable map rotation using touch rotation gesture
  map.touchZoomRotate.disableRotation()
}

// Add custom layers for storytelling effects
const addCustomLayers = () => {
  const map = mapInstance.value
  if (!map) return

  // Add water layer
  map.addLayer({
    id: 'water',
    type: 'fill',
    source: 'composite',
    'source-layer': 'water',
    paint: {
      'fill-color': '#4264fb',
      'fill-opacity': 0.6
    }
  })

  // Add parks layer
  map.addLayer({
    id: 'parks',
    type: 'fill',
    source: 'composite',
    'source-layer': 'landuse',
    filter: ['==', 'class', 'park'],
    paint: {
      'fill-color': '#6bb6ff',
      'fill-opacity': 0.4
    }
  })

  // Add roads layer
  map.addLayer({
    id: 'roads',
    type: 'line',
    source: 'composite',
    'source-layer': 'road',
    paint: {
      'line-color': '#ffffff',
      'line-width': 2,
      'line-opacity': 0.8
    }
  })
}

// Handle chapter changes
const handleChapterChange = (chapter, index) => {
  console.log(`Chapter changed to: ${chapter.title} (${index})`)
}

// Handle map movements
const handleMapMove = (location) => {
  if (!mapInstance.value) return

  mapInstance.value.flyTo({
    center: location.center,
    zoom: location.zoom,
    pitch: location.pitch || 0,
    bearing: location.bearing || 0,
    speed: location.speed || 0.8,
    curve: 1.42,
    easing: (t) => t
  })
}

// Lifecycle hooks
onMounted(() => {
  document.fonts.ready.then(() => {
    initPreloader()
  })
})

onUnmounted(() => {
  if (mapInstance.value) {
    mapInstance.value.remove()
  }
})
</script>

<style scoped>
.main-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.main-container.loaded {
  opacity: 1;
}

.map-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

/* Ensure Mapbox controls are properly styled */
:deep(.mapboxgl-ctrl-group) {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 8px;
}

:deep(.mapboxgl-ctrl-group button) {
  background: transparent;
  border: none;
}

:deep(.mapboxgl-ctrl-group button:hover) {
  background: rgba(0, 0, 0, 0.1);
}
</style>