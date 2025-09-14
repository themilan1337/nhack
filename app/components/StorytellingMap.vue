<template>
  <div class="storytelling-container">
    <!-- Map Container -->
    <div id="storytelling-map" class="map-container"></div>
    
    <!-- Story Content -->
    <div id="story" class="story-container">
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
          <div class="chapter-card px-4">
            <div class="story-card">
              <img v-if="chapter.image" :src="chapter.image" alt="Chapter image" class="card-image" />
              <div class="card-content">
                <h3 v-if="chapter.title" class="card-title">{{ chapter.title }}</h3>
                <p v-if="chapter.description" class="card-description" v-html="chapter.description"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer Card -->
      <div v-if="config.footer" id="footer" class="footer-card px-4 mt-8">
        <div class="story-card">
          <div class="card-content">
            <p class="card-description" v-html="config.footer"></p>
          </div>
        </div>
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
  theme: 'light',
  alignment: 'left',
  title: 'inDrive Journey',
  subtitle: 'Discover the story behind our innovative transportation platform',
  chapters: [
    {
      id: 'intro-chapter',
      title: 'Welcome to inDrive',
      image: '/1.webp',
      description: 'inDrive is revolutionizing transportation by putting passengers and drivers in control. Our platform allows you to negotiate fair prices and choose your preferred driver. <br><br><strong>Scroll down to explore our journey</strong>',
      location: {
        center: [71.41583333, 51.09500000],
        zoom: 15,
        pitch: 30,
        bearing: 0
      },
      alignment: 'left',
      onChapterEnter: [],
      onChapterExit: []
    },
    {
      id: 'city-overview',
      title: 'Connecting Cities Worldwide',
      image: '/2.webp',
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
      image: '/3.webp',
      description: 'Our advanced algorithms ensure optimal matching between passengers and drivers, while maintaining transparency and fairness in pricing. Real-time tracking and secure payments make every journey safe and reliable.',
      location: {
        center: [71.41222, 51.08528],
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
      image: '/4.webp',
      description: 'inDrive empowers local communities by providing economic opportunities for drivers and affordable transportation for passengers. We believe in fair pricing that benefits everyone in the ecosystem.',
      location: {
        center: [71.41280555555556, 51.09125],
        zoom: 14,
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
      image: '/1.webp',
      description: 'Operating in over 600 cities across 47 countries, inDrive has become a trusted transportation partner worldwide. Each market brings unique challenges and opportunities.',
      location: {
        center: [71.41583333333333, 51.08083333333333],
        zoom: 13,
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
      image: '/2.webp',
      description: 'Join us as we continue to innovate and expand, creating a more connected and accessible world through smart transportation solutions. <br><br><a href="#contact" style="color: #00d4aa; font-weight: bold;">Get Started Today →</a>',
      location: {
        center: [71.41611111, 51.09027778],
        zoom: 14,
        pitch: 0,
        bearing: 90
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
const trafficData = ref(new Map())
const trafficVisible = ref(true)

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

// Load traffic data from CSV
const loadTrafficData = async () => {
  try {
    const response = await fetch('/files/grid_data.csv')
    const data = await response.text()
    const lines = data.split('\n')
    const features = []

    // Create filled squares using exact corner coordinates from CSV
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      const [cell_id, lat_center, lng_center, lat_min, lat_max, lng_min, lng_max, point_density, avg_speed, traffic_load] = line.split(',')

      if (lat_min && lat_max && lng_min && lng_max && traffic_load) {
        const load = parseFloat(traffic_load)
        const speed = parseFloat(avg_speed)
        const latMin = parseFloat(lat_min)
        const latMax = parseFloat(lat_max)
        const lngMin = parseFloat(lng_min)
        const lngMax = parseFloat(lng_max)

        // Ultra-smooth intensity mapping for maximum color gradation
        const intensity = Math.min(1.0, Math.max(0.0, load))

        // Store traffic data
        const centerLat = parseFloat(lat_center)
        const centerLng = parseFloat(lng_center)
        const [row, col] = cell_id.split('_').map(n => parseInt(n))

        trafficData.value.set(cell_id, {
          lat: centerLat,
          lng: centerLng,
          latMin: latMin,
          latMax: latMax,
          lngMin: lngMin,
          lngMax: lngMax,
          traffic_load: load,
          avg_speed: speed,
          row: row,
          col: col,
          weight: load + (1.0 / Math.max(speed, 1))
        })

        // Create filled polygon using corner coordinates with slight overlap
        const overlap = 0.000005
        const smoothLngMin = lngMin - overlap
        const smoothLngMax = lngMax + overlap
        const smoothLatMin = latMin - overlap
        const smoothLatMax = latMax + overlap

        features.push({
          type: 'Feature',
          properties: {
            intensity: intensity,
            traffic_load: load,
            avg_speed: speed,
            cell_id: cell_id,
            point_density: parseFloat(point_density) || 0
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [smoothLngMin, smoothLatMin], // Bottom-left
              [smoothLngMax, smoothLatMin], // Bottom-right
              [smoothLngMax, smoothLatMax], // Top-right
              [smoothLngMin, smoothLatMax], // Top-left
              [smoothLngMin, smoothLatMin]  // Close polygon
            ]]
          }
        })
      }
    }

    console.log(`Created ${features.length} smooth filled squares with 21-color spectrum`)

    // Add traffic source with CSV data
    map.value.addSource('traffic', {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': features
      }
    })

    // Add traffic layer as smooth filled squares with ultra-large color spectrum
    map.value.addLayer({
      'id': 'traffic',
      'type': 'fill',
      'source': 'traffic',
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'intensity'],
          0.00, '#004d00',  // Very Dark Green
          0.05, '#006600',  // Dark Green
          0.10, '#008800',  // Forest Green
          0.15, '#00aa00',  // Green
          0.20, '#00cc00',  // Bright Green
          0.25, '#00ff00',  // Pure Green
          0.30, '#33ff33',  // Light Green
          0.35, '#66ff66',  // Pale Green
          0.40, '#99ff99',  // Very Light Green
          0.45, '#ccffcc',  // Mint Green
          0.50, '#ffff99',  // Light Yellow Green
          0.55, '#ffff66',  // Yellow Green
          0.60, '#ffff33',  // Yellow
          0.65, '#ffff00',  // Pure Yellow
          0.70, '#ffcc00',  // Golden Yellow
          0.75, '#ff9900',  // Orange Yellow
          0.80, '#ff6600',  // Orange
          0.85, '#ff3300',  // Red Orange
          0.90, '#ff0000',  // Red
          0.95, '#cc0000',  // Dark Red
          1.00, '#990000'   // Very Dark Red
        ],
        'fill-opacity': 0.8,
        'fill-outline-color': 'transparent'
      }
    })

    console.log(`Loaded ${features.length} traffic data points`)
  } catch (error) {
    console.error('Error loading CSV data:', error)
  }
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
    loadTrafficData()
    initializeScrollama()
  })
}

// Initialize scrollama
const initializeScrollama = () => {
  scroller.value = scrollama()
  
  scroller.value
    .setup({
      step: '.step',
      offset: 0.5,
      progress: true,
      container: '.story-container'
    })
    .onStepEnter(async (response) => {
      const currentChapterIndex = config.value.chapters.findIndex(chap => chap.id === response.element.id)
      const chapter = config.value.chapters[currentChapterIndex]
      
      // Add active class
      response.element.classList.add('active')
      
      // Animate map to chapter location
      map.value[chapter.mapAnimation || 'flyTo'](chapter.location)
      
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
      
      // Handle rotation animation
      if (chapter.rotateAnimation) {
        map.value.once('moveend', () => {
          const rotateNumber = map.value.getBearing()
          map.value.rotateTo(rotateNumber + 180, {
            duration: 30000,
            easing: (t) => t
          })
        })
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
})
</script>

<style scoped>
.storytelling-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.map-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.story-container {
  position: relative;
  z-index: 5;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scroll-behavior: smooth;
}

.story-container::-webkit-scrollbar {
  display: none; /* WebKit */
}

/* Card Styles */
.story-card {
  background: #fff;
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 32px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.story-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #C0F11C, #A8E010);
  border-radius: 24px 24px 0 0;
}

.card-content {
  position: relative;
  z-index: 2;
}

.card-title {
  font-family: 'Epilogue', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 16px;
  line-height: 1.3;
}

.card-description {
  font-family: 'Epilogue', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #4a4a4a;
  line-height: 1.6;
  margin: 0;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 24px;
}

.header-card,
.footer-card {
  position: relative;
  z-index: 5;
  width: 100%;
}

.chapter-card {
  position: relative;
  z-index: 5;
}

.features {
  padding-top: 0;
  padding-bottom: 0;
}

.step {
  padding-bottom: 0;
  opacity: 0.25;
  transition: opacity 0.3s ease;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.step.active {
  opacity: 0.9;
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



@media (max-width: 750px) {
  .centered,
  .lefty,
  .righty,
  .fully {
    width: 90vw;
    margin: 0 auto;
  }
  
  .story-card {
    padding: 24px;
    border-radius: 20px;
  }
  
  .card-title {
    font-size: 24px;
    margin-bottom: 12px;
  }
  
  .card-description {
    font-size: 14px;
    line-height: 1.5;
  }
  
  .card-image {
    height: 160px;
    margin-bottom: 20px;
    border-radius: 12px;
  }
  
  .step {
    padding-bottom: 0;
    min-height: 100vh;
  }
  
  .features {
    padding-top: 0;
    padding-bottom: 0;
  }
}

/* Fix mobile scroll issues */
:deep(.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan),
:deep(.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan .mapboxgl-canvas) {
  touch-action: unset;
}
</style>