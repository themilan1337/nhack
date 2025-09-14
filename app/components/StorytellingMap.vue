<template>
  <div class="storytelling-container">
    <!-- Map Container -->
    <div id="storytelling-map" class="map-container"></div>
    
    <!-- Story Content -->
    <div id="story" class="story-container">
      <!-- Header -->
      <div v-if="config.title || config.subtitle" id="header" :class="config.theme" class="header">
        <h1 v-if="config.title">{{ config.title }}</h1>
        <h2 v-if="config.subtitle">{{ config.subtitle }}</h2>
      </div>
      
      <!-- Features/Chapters -->
      <div id="features" class="features">
        <div
          v-for="(chapter, idx) in config.chapters"
          :key="chapter.id"
          :id="chapter.id"
          :class="[
            'step',
            { 'active': idx === 0 },
            alignments[chapter.alignment] || 'centered',
            { 'hidden': chapter.hidden }
          ]"
        >
          <div :class="config.theme" class="chapter-content">
            <h3 v-if="chapter.title">{{ chapter.title }}</h3>
            <img v-if="chapter.image" :src="chapter.image" alt="Chapter image" />
            <p v-if="chapter.description" v-html="chapter.description"></p>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div v-if="config.footer" id="footer" :class="config.theme" class="footer">
        <p v-html="config.footer"></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import scrollama from 'scrollama'

// Define the storytelling config directly in the component
const storytellingConfig = {
  style: 'mapbox://styles/milan1337/cmfibsuq8003s01s6cslgb9z0',
  accessToken: 'pk.eyJ1IjoibWlsYW4xMzM3IiwiYSI6ImNtZmliNGw1NjBqMHUya3F3N2ZlYmI4dGkifQ.1wSnZEu14y4snJroP8xOYA',
  showMarkers: false,
  theme: 'dark',
  alignment: 'left',
  title: 'inDrive Journey',
  subtitle: 'Discover the story behind our innovative transportation platform',
  footer: 'Experience the future of ride-sharing with inDrive',
  // Global animation preferences (can be overridden per chapter)
  animation: {
    duration: 3200,          // ms
    pauseAfterMove: 700,     // ms pause to "hold" after arriving
    easingFn: (t) => 1 - Math.pow(1 - t, 3)
  },
  chapters: [
    {
      id: 'intro-chapter',
      title: 'Welcome to inDrive',
      image: '',
      description: 'inDrive is revolutionizing transportation by putting passengers and drivers in control. Our platform allows you to negotiate fair prices and choose your preferred driver. <br><br><strong>Scroll down to explore our journey</strong>',
      location: {
        center: [71.42, 51.0889],
        zoom: 10,
        pitch: 0,
        bearing: 0
      },
      alignment: 'left',
      onChapterEnter: [],
      onChapterExit: []
    },
    {
      id: 'city-overview',
      title: 'Connecting Cities Worldwide',
      image: '',
      description: 'From bustling metropolises to growing urban centers, inDrive connects communities worldwide. Our platform adapts to local needs and preferences, ensuring every ride is tailored to your requirements.',
      location: {
        center: [71.42, 51.0889],
        zoom: 14,
        pitch: 45,
        bearing: -17.6
      },
      alignment: 'right',
      onChapterEnter: [],
      onChapterExit: []
    },
    {
      id: 'technology-focus',
      title: 'Smart Technology at Work',
      image: '',
      description: 'Our advanced algorithms ensure optimal matching between passengers and drivers, while maintaining transparency and fairness in pricing. Real-time tracking and secure payments make every journey safe and reliable.',
      location: {
        center: [71.43, 51.09],
        zoom: 16,
        pitch: 60,
        bearing: 45
      },
      alignment: 'left',
      onChapterEnter: [],
      onChapterExit: []
    },
    {
      id: 'community-impact',
      title: 'Empowering Communities',
      image: '',
      description: 'inDrive empowers local communities by providing economic opportunities for drivers and affordable transportation for passengers. We believe in fair pricing that benefits everyone in the ecosystem.',
      location: {
        center: [71.41, 51.08],
        zoom: 12,
        pitch: 30,
        bearing: -45
      },
      alignment: 'center',
      onChapterEnter: [],
      onChapterExit: []
    },
    {
      id: 'global-expansion',
      title: 'Global Reach, Local Impact',
      image: '',
      description: 'Operating in over 600 cities across 47 countries, inDrive has become a trusted transportation partner worldwide. Each market brings unique challenges and opportunities.',
      location: {
        center: [71.44, 51.10],
        zoom: 11,
        pitch: 50,
        bearing: 90
      },
      alignment: 'right',
      onChapterEnter: [],
      onChapterExit: []
    },
    {
      id: 'future-vision',
      title: 'The Future of Mobility',
      image: '',
      description: 'Join us as we continue to innovate and expand, creating a more connected and accessible world through smart transportation solutions. <br><br><a href="#contact" style="color: #00d4aa; font-weight: bold;">Get Started Today →</a>',
      location: {
        center: [71.42, 51.0889],
        zoom: 8,
        pitch: 0,
        bearing: 0
      },
      alignment: 'center',
      onChapterEnter: [],
      onChapterExit: []
    }
  ]
}

// Props
const props = defineProps({
  customConfig: {
    type: Object,
    default: () => ({})
  }
})

// Reactive data
const config = ref({ ...storytellingConfig, ...props.customConfig })
const map = ref(null)
const scroller = ref(null)
const marker = ref(null)
const isAnimating = ref(false)

// Alignment classes
const alignments = {
  'left': 'lefty',
  'center': 'centered', 
  'right': 'righty',
  'full': 'fully'
}

// Layer types for opacity control
const layerTypes = {
  'fill': ['fill-opacity'],
  'line': ['line-opacity'],
  'circle': ['circle-opacity', 'circle-stroke-opacity'],
  'symbol': ['icon-opacity', 'text-opacity'],
  'raster': ['raster-opacity'],
  'fill-extrusion': ['fill-extrusion-opacity'],
  'heatmap': ['heatmap-opacity']
}

// Helper functions
const getLayerPaintType = (layer) => {
  const layerType = map.value.getLayer(layer).type
  return layerTypes[layerType]
}

const setLayerOpacity = (layer) => {
  const paintProps = getLayerPaintType(layer.layer)
  paintProps.forEach((prop) => {
    let options = {}
    if (layer.duration) {
      const transitionProp = prop + "-transition"
      options = { "duration": layer.duration }
      map.value.setPaintProperty(layer.layer, transitionProp, options)
    }
    map.value.setPaintProperty(layer.layer, prop, layer.opacity, options)
  })
}

// Scroll lock utilities for creating pauses
const preventDefault = (e) => { e.preventDefault() }
const preventKeys = (e) => {
  const keys = ['Space','PageUp','PageDown','End','Home','ArrowLeft','ArrowUp','ArrowRight','ArrowDown']
  if (keys.includes(e.code)) e.preventDefault()
}
const lockScroll = () => {
  window.addEventListener('wheel', preventDefault, { passive: false })
  window.addEventListener('touchmove', preventDefault, { passive: false })
  window.addEventListener('keydown', preventKeys, { passive: false })
}
const unlockScroll = () => {
  window.removeEventListener('wheel', preventDefault, { passive: false })
  window.removeEventListener('touchmove', preventDefault, { passive: false })
  window.removeEventListener('keydown', preventKeys, { passive: false })
}

// Initialize map
const initializeMap = async () => {
  // Dynamically import mapbox-gl
  const mapboxgl = await import('mapbox-gl')
  
  mapboxgl.default.accessToken = config.value.accessToken
  
  map.value = new mapboxgl.default.Map({
    container: 'storytelling-map',
    style: config.value.style,
    center: config.value.chapters[0].location.center,
    zoom: config.value.chapters[0].location.zoom,
    bearing: config.value.chapters[0].location.bearing,
    pitch: config.value.chapters[0].location.pitch,
    interactive: false,
    projection: config.value.projection
  })
  
  // Add marker if enabled
  if (config.value.showMarkers) {
    marker.value = new mapboxgl.default.Marker({ color: config.value.markerColor })
    marker.value.setLngLat(config.value.chapters[0].location.center).addTo(map.value)
  }
  
  // Initialize scrollama when map loads
  map.value.on('load', () => {
    initializeScrollama()
  })
}

// Initialize scrollama
const initializeScrollama = () => {
  scroller.value = scrollama()
  
  scroller.value
    .setup({
      step: '.step',
      offset: 0.6,
      progress: true
    })
    .onStepEnter(async (response) => {
      // Avoid re-entrancy if already animating (helps enforce pause)
      if (isAnimating.value) return

      const currentChapterIndex = config.value.chapters.findIndex(chap => chap.id === response.element.id)
      const chapter = config.value.chapters[currentChapterIndex]
      
      // Add active class
      response.element.classList.add('active')
      
      // Lock scroll to create a pause while the map animates
      isAnimating.value = true
      lockScroll()

      // Build animation options with smooth/slow transition
      const duration = chapter.duration ?? config.value.animation?.duration ?? 3200
      const pauseAfter = chapter.pauseAfter ?? config.value.animation?.pauseAfterMove ?? 700
      const easingFn = chapter.easingFn ?? config.value.animation?.easingFn ?? ((t) => 1 - Math.pow(1 - t, 3))
      const method = chapter.mapAnimation || config.value.mapAnimation || 'flyTo'

      const animateToChapter = () => {
        map.value[method]({
          ...chapter.location,
          duration,
          easing: easingFn,
          essential: true
        })
      }

      const finishPause = () => {
        setTimeout(() => {
          unlockScroll()
          isAnimating.value = false
        }, pauseAfter)
      }

      // Handle rotation animation sequencing if requested
      if (chapter.rotateAnimation) {
        map.value.once('moveend', () => {
          const rotateNumber = map.value.getBearing()
          map.value.rotateTo(rotateNumber + 180, {
            duration: Math.max(2400, duration),
            easing: (t) => t
          })
          map.value.once('moveend', finishPause)
        })
        animateToChapter()
      } else {
        map.value.once('moveend', finishPause)
        animateToChapter()
      }
      
      // Update marker position
      if (config.value.showMarkers && marker.value) {
        marker.value.setLngLat(chapter.location.center)
      }
      
      // Handle layer opacity changes on enter
      if (chapter.onChapterEnter && chapter.onChapterEnter.length > 0) {
        chapter.onChapterEnter.forEach(setLayerOpacity)
      }
      
      // Execute callback if defined
      if (chapter.callback && typeof window[chapter.callback] === 'function') {
        window[chapter.callback]()
      }
    })
    .onStepExit((response) => {
      const chapter = config.value.chapters.find(chap => chap.id === response.element.id)
      
      // Remove active class
      response.element.classList.remove('active')
      
      // Handle layer opacity changes on exit
      if (chapter.onChapterExit && chapter.onChapterExit.length > 0) {
        chapter.onChapterExit.forEach(setLayerOpacity)
      }
    })
}

// Lifecycle hooks
onMounted(() => {
  initializeMap()
})

onUnmounted(() => {
  if (scroller.value) {
    scroller.value.destroy()
  }
  if (map.value) {
    map.value.remove()
  }
  // Ensure scroll is unlocked if component unmounts during animation
  unlockScroll()
})
</script>

<style scoped>
.storytelling-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.map-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
}

.story-container {
  position: relative;
  z-index: 5;
}

.header {
  margin: auto;
  width: 100%;
  position: relative;
  z-index: 5;
}

.header h1,
.header h2,
.header p {
  margin: 0;
  padding: 2vh 2vw;
  text-align: center;
}

.footer {
  width: 100%;
  min-height: 5vh;
  padding-top: 2vh;
  padding-bottom: 2vh;
  text-align: center;
  line-height: 25px;
  font-size: 13px;
  position: relative;
  z-index: 5;
}

.features {
  padding-top: 10vh;
  padding-bottom: 10vh;
}

.step {
  padding-bottom: 80vh;
  opacity: 0.25;
  transition: opacity 0.45s ease;
}

.step.active {
  opacity: 0.95;
}

.chapter-content {
  padding: 28px 48px;
  line-height: 28px;
  font-size: 14px;
  border-radius: 16px;
  /* Premium glassy card */
  background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
  border: 1px solid rgba(255,255,255,0.15);
  box-shadow: 0 20px 60px rgba(0,0,0,0.35);
  backdrop-filter: blur(14px) saturate(120%);
  -webkit-backdrop-filter: blur(14px) saturate(120%);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.chapter-content:hover {
  transform: translateY(-2px);
  box-shadow: 0 30px 80px rgba(0,0,0,0.45);
}

.chapter-content img {
  width: 100%;
  border-radius: 8px;
}

.hidden {
  visibility: hidden;
}

.centered {
  width: 50vw;
  margin: 0 auto;
}

.lefty {
  width: 33vw;
  margin-left: 5vw;
}

.righty {
  width: 33vw;
  margin-left: 62vw;
}

.fully {
  width: 100%;
  margin: auto;
}

.light {
  color: #444;
  background-color: rgba(250, 250, 250, 0.9);
}

.dark {
  color: #fafafa;
  background-color: rgba(68, 68, 68, 0.9);
}

@media (max-width: 750px) {
  .centered,
  .lefty,
  .righty,
  .fully {
    width: 90vw;
    margin: 0 auto;
  }
  
  .chapter-content {
    padding: 20px 24px;
    font-size: 13px;
    line-height: 28px;
  }
}

/* Fix mobile scroll issues */
:deep(.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan),
:deep(.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan .mapboxgl-canvas) {
  touch-action: unset;
}
</style>