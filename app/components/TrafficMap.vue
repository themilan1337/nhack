<template>
  <div class="traffic-map-container">
    <!-- Map Container -->
    <div id="traffic-map" class="map-container"></div>
    


    <!-- Info Panel -->
    <div class="info-panel">
      <h3>Traffic Intensity Map</h3>
      <p>Smooth traffic visualization with 21-color gradient spectrum.</p>
      <p><strong style="color: #004d00;">■</strong> <strong>Very Dark Green:</strong> Minimum (0.0)</p>
      <p><strong style="color: #008800;">■</strong> <strong>Forest Green:</strong> Low (0.1)</p>
      <p><strong style="color: #00ff00;">■</strong> <strong>Bright Green:</strong> Good (0.25)</p>
      <p><strong style="color: #66ff66;">■</strong> <strong>Pale Green:</strong> Moderate (0.35)</p>
      <p><strong style="color: #ccffcc;">■</strong> <strong>Mint:</strong> Medium (0.45)</p>
      <p><strong style="color: #ffff99;">■</strong> <strong>Yellow-Green:</strong> Elevated (0.5)</p>
      <p><strong style="color: #ffff00;">■</strong> <strong>Yellow:</strong> Notable (0.65)</p>
      <p><strong style="color: #ffcc00;">■</strong> <strong>Gold:</strong> High (0.7)</p>
      <p><strong style="color: #ff9900;">■</strong> <strong>Orange-Yellow:</strong> Serious (0.75)</p>
      <p><strong style="color: #ff6600;">■</strong> <strong>Orange:</strong> Heavy (0.8)</p>
      <p><strong style="color: #ff3300;">■</strong> <strong>Red-Orange:</strong> Critical (0.85)</p>
      <p><strong style="color: #ff0000;">■</strong> <strong>Red:</strong> Traffic Jam (0.9)</p>
      <p><strong style="color: #990000;">■</strong> <strong>Dark Red:</strong> Maximum (1.0)</p>
      <p><small>Smooth transitions between all 21 spectrum colors</small></p>
    </div>

    <!-- Control Buttons -->
    <div class="control-buttons">
      <button @click="toggleTrafficVisibility" class="control-btn" :class="{ active: showTraffic }">
        {{ showTraffic ? 'Hide Traffic' : 'Show Traffic' }}
      </button>
      <button @click="toggleRouteMode" class="control-btn" :class="{ active: routeMode }">
        {{ routeMode ? 'Exit Route' : 'Find Route' }}
      </button>
    </div>

    <!-- Route Panel -->
    <transition name="fade">
      <div v-if="showRoutePanel" class="route-panel">
        <div class="route-header">
          <button @click="showRoutePanel = false" class="close-btn">×</button>
        </div>
        <div class="route-content" v-html="routeInfo"></div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Reactive data
const map = ref(null)
const trafficVisible = ref(true)
const trafficData = ref(new Map())
const trafficGraph = ref(new Map())
const routeMode = ref(false)
const pointA = ref(null)
const pointB = ref(null)
const routeMarkers = ref([])
const routeLine = ref(null)
const showClearBtn = ref(false)
const showRoutePanel = ref(false)
const routeStatus = ref('Click to select point A')
const routeInfo = ref('')
const showTraffic = ref(true)

// Initialize map
const initializeMap = async () => {
  const mapboxgl = await import('mapbox-gl')
  
  mapboxgl.default.accessToken = 'pk.eyJ1IjoibWlsYW4xMzM3IiwiYSI6ImNtZmliNGw1NjBqMHUya3F3N2ZlYmI4dGkifQ.1wSnZEu14y4snJroP8xOYA'
  
  map.value = new mapboxgl.default.Map({
    container: 'traffic-map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [71.416111, 51.088889], // 51°05'20"N 71°24'58"E converted to decimal degrees
    zoom: 14,
    scrollZoom: false,
    boxZoom: false,
    dragPan: false,
    dragRotate: false,
    keyboard: false,
    doubleClickZoom: false,
    touchZoomRotate: false
  })

  // Add navigation controls
  map.value.addControl(new mapboxgl.default.NavigationControl())
  map.value.addControl(new mapboxgl.default.FullscreenControl())
  map.value.addControl(
    new mapboxgl.default.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    })
  )

  map.value.on('load', () => {
    loadTrafficData()
    setupMapEvents()
  })
}

// Load traffic data from CSV
const loadTrafficData = async () => {
  try {
    const response = await fetch('/files/grid_data.csv')
    const data = await response.text()
    const lines = data.split('\n')
    const features = []

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

        const intensity = Math.min(1.0, Math.max(0.0, load))

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
              [smoothLngMin, smoothLatMin],
              [smoothLngMax, smoothLatMin],
              [smoothLngMax, smoothLatMax],
              [smoothLngMin, smoothLatMax],
              [smoothLngMin, smoothLatMin]
            ]]
          }
        })
      }
    }

    buildTrafficGraph()

    map.value.addSource('traffic', {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': features
      }
    })

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
          0.00, '#004d00',
          0.05, '#006600',
          0.10, '#008800',
          0.15, '#00aa00',
          0.20, '#00cc00',
          0.25, '#00ff00',
          0.30, '#33ff33',
          0.35, '#66ff66',
          0.40, '#99ff99',
          0.45, '#ccffcc',
          0.50, '#ffff99',
          0.55, '#ffff66',
          0.60, '#ffff33',
          0.65, '#ffff00',
          0.70, '#ffcc00',
          0.75, '#ff9900',
          0.80, '#ff6600',
          0.85, '#ff3300',
          0.90, '#ff0000',
          0.95, '#cc0000',
          1.00, '#990000'
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

// Build traffic graph for pathfinding
const buildTrafficGraph = () => {
  trafficGraph.value.clear()

  for (let [cellId, cellData] of trafficData.value) {
    const neighbors = []
    const row = cellData.row
    const col = cellData.col

    const adjacentCells = [
      `${row-1}_${col}`,
      `${row+1}_${col}`,
      `${row}_${col-1}`,
      `${row}_${col+1}`
    ]

    for (let neighborId of adjacentCells) {
      if (trafficData.value.has(neighborId)) {
        const neighbor = trafficData.value.get(neighborId)
        const dx = cellData.lng - neighbor.lng
        const dy = cellData.lat - neighbor.lat
        const distance = Math.sqrt(dx * dx + dy * dy)
        const weight = distance * neighbor.weight

        neighbors.push({
          id: neighborId,
          weight: weight,
          distance: distance
        })
      }
    }

    trafficGraph.value.set(cellId, neighbors)
  }
}

// Setup map events
const setupMapEvents = async () => {
  const mapboxgl = await import('mapbox-gl')

  // Click event for traffic info
  map.value.on('click', 'traffic', (e) => {
    // Don't show traffic details popup when in route mode
    if (routeMode.value) return
    
    const properties = e.features[0].properties
    const coordinates = e.lngLat

    const intensityPercent = (properties.intensity * 100).toFixed(0)
    let trafficLevel = ''
    let colorCode = ''

    if (properties.intensity >= 1.0) {
      trafficLevel = 'Extreme Traffic (0.95+)'
      colorCode = '#C62828'
    } else if (properties.intensity >= 0.9) {
      trafficLevel = 'Above 75% (0.91-0.95)'
      colorCode = '#E53935'
    } else if (properties.intensity >= 0.8) {
      trafficLevel = 'Heavy Congestion (0.85-0.91)'
      colorCode = '#F44336'
    } else if (properties.intensity >= 0.7) {
      trafficLevel = 'Significant Congestion (0.8-0.85)'
      colorCode = '#FF5722'
    } else if (properties.intensity >= 0.6) {
      trafficLevel = 'Above Median (0.74-0.8)'
      colorCode = '#FF9800'
    } else if (properties.intensity >= 0.5) {
      trafficLevel = 'Around Median (0.7-0.74)'
      colorCode = '#FFC107'
    } else if (properties.intensity >= 0.4) {
      trafficLevel = 'Below Median (0.65-0.7)'
      colorCode = '#FFEB3B'
    } else if (properties.intensity >= 0.3) {
      trafficLevel = 'Above 25% (0.57-0.65)'
      colorCode = '#CDDC39'
    } else if (properties.intensity >= 0.2) {
      trafficLevel = 'Good (0.5-0.57)'
      colorCode = '#8BC34A'
    } else if (properties.intensity >= 0.1) {
      trafficLevel = 'Very Good (0.4-0.5)'
      colorCode = '#7CB342'
    } else {
      trafficLevel = 'Free Flow (<0.4)'
      colorCode = '#00C851'
    }

    showTrafficData({
      cell_id: properties.cell_id,
      traffic_load: properties.traffic_load,
      avg_speed: properties.avg_speed,
      point_density: properties.point_density,
      intensity: properties.intensity,
      trafficLevel: trafficLevel,
      colorCode: colorCode,
      intensityPercent: intensityPercent,
      lat: coordinates.lat,
      lng: coordinates.lng
    })
  })

  // Cursor events
  map.value.on('mouseenter', 'traffic', () => {
    map.value.getCanvas().style.cursor = 'pointer'
  })

  map.value.on('mouseleave', 'traffic', () => {
    map.value.getCanvas().style.cursor = ''
  })

  // Route selection clicks
  map.value.on('click', (e) => {
    if (!routeMode.value) return

    const coordinates = [e.lngLat.lng, e.lngLat.lat]

    if (!pointA.value) {
      pointA.value = coordinates

      const markerA = new mapboxgl.default.Marker({ color: '#00ff00' })
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.default.Popup().setHTML('<h4>Point A (Start)</h4>'))
        .addTo(map.value)
      routeMarkers.value.push(markerA)

      routeStatus.value = 'Click to select point B (destination)'
    } else if (!pointB.value) {
      pointB.value = coordinates

      const markerB = new mapboxgl.default.Marker({ color: '#ff0000' })
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.default.Popup().setHTML('<h4>Point B (End)</h4>'))
        .addTo(map.value)
      routeMarkers.value.push(markerB)

      calculateRoute(pointA.value, pointB.value)
      routeStatus.value = '✅ Route calculated!'
      showClearBtn.value = true
      map.value.getCanvas().style.cursor = ''
      routeMode.value = false
    }
  })
}

// Toggle traffic visibility for control buttons
const toggleTrafficVisibility = () => {
  showTraffic.value = !showTraffic.value
  trafficVisible.value = showTraffic.value

  if (map.value.getLayer('traffic')) {
    map.value.setLayoutProperty(
      'traffic',
      'visibility',
      showTraffic.value ? 'visible' : 'none'
    )
  }
}

// Toggle route mode for control buttons
 const toggleRouteMode = () => {
   routeMode.value = !routeMode.value
   if (routeMode.value) {
     startRouteMode()
   } else {
     clearRoute()
   }
 }

// Start route mode
 const startRouteMode = () => {
    routeMode.value = true
  pointA.value = null
  pointB.value = null

  routeStatus.value = 'Click on the map to select point A (route start)'
  map.value.getCanvas().style.cursor = 'crosshair'
}

// Clear route
 const clearRoute = () => {
    routeMode.value = false
  pointA.value = null
  pointB.value = null

  showRoutePanel.value = false
  showClearBtn.value = false

  routeMarkers.value.forEach(marker => marker.remove())
  routeMarkers.value = []

  if (map.value.getSource('route')) {
    map.value.removeLayer('route')
    map.value.removeSource('route')
  }

  map.value.getCanvas().style.cursor = ''
}

// Pathfinding algorithm
const findTrafficAwarePath = (startLat, startLng, endLat, endLng) => {
  let startCell = null
  let endCell = null
  let minStartDist = Infinity
  let minEndDist = Infinity

  for (let [cellId, cellData] of trafficData.value) {
    const startDist = Math.sqrt(
      Math.pow(cellData.lat - startLat, 2) +
      Math.pow(cellData.lng - startLng, 2)
    )
    if (startDist < minStartDist) {
      minStartDist = startDist
      startCell = cellId
    }

    const endDist = Math.sqrt(
      Math.pow(cellData.lat - endLat, 2) +
      Math.pow(cellData.lng - endLng, 2)
    )
    if (endDist < minEndDist) {
      minEndDist = endDist
      endCell = cellId
    }
  }

  if (!startCell || !endCell) return null

  const distances = new Map()
  const previous = new Map()
  const unvisited = new Set()

  for (let [cellId] of trafficData.value) {
    distances.set(cellId, Infinity)
    unvisited.add(cellId)
  }
  distances.set(startCell, 0)

  while (unvisited.size > 0) {
    let currentCell = null
    let minDistance = Infinity

    for (let cellId of unvisited) {
      if (distances.get(cellId) < minDistance) {
        minDistance = distances.get(cellId)
        currentCell = cellId
      }
    }

    if (currentCell === null || minDistance === Infinity) break

    unvisited.delete(currentCell)

    if (currentCell === endCell) break

    const neighbors = trafficGraph.value.get(currentCell) || []
    for (let neighbor of neighbors) {
      if (unvisited.has(neighbor.id)) {
        const altDistance = distances.get(currentCell) + neighbor.weight
        if (altDistance < distances.get(neighbor.id)) {
          distances.set(neighbor.id, altDistance)
          previous.set(neighbor.id, currentCell)
        }
      }
    }
  }

  const path = []
  let currentCell = endCell

  while (currentCell !== undefined) {
    const cellData = trafficData.value.get(currentCell)
    path.unshift([cellData.lng, cellData.lat])
    currentCell = previous.get(currentCell)
  }

  return path.length > 0 ? path : null
}

// Show traffic data in full-screen overlay
const showTrafficData = (data) => {
  routeInfo.value = `
    <div style="padding: 30px; background: white; border-radius: 12px; max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <h3 style="margin: 0 0 20px 0; color: #333; font-size: 24px; text-align: center;">Traffic Grid Cell Details</h3>
      <div style="font-size: 16px; line-height: 1.6;">
        <p style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 6px;"><strong>Cell ID:</strong> ${data.cell_id}</p>
        <p style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 6px;"><strong>Traffic Load:</strong> ${data.traffic_load.toFixed(4)}</p>
        <p style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 6px;"><strong>Average Speed:</strong> ${data.avg_speed.toFixed(1)} km/h</p>
        <p style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 6px;"><strong>Point Density:</strong> ${data.point_density}</p>
        <p style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 6px;"><strong>Traffic Level:</strong> <span style="color: ${data.colorCode}; font-size: 20px;">■</span> ${data.trafficLevel}</p>
        <p style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 6px;"><strong>Intensity:</strong> ${data.intensityPercent}% (${data.intensity.toFixed(4)})</p>
        <p style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 6px;"><strong>Coordinates:</strong><br>
        Lat: ${data.lat.toFixed(6)}<br>
        Lng: ${data.lng.toFixed(6)}</p>
      </div>
    </div>
  `
  showRoutePanel.value = true
}

// Calculate route
const calculateRoute = async (start, end) => {
  try {
    const route = findTrafficAwarePath(start[1], start[0], end[1], end[0])

    if (!route || route.length === 0) {
      throw new Error('No traffic-aware path found')
    }

    if (map.value.getSource('route')) {
      map.value.getSource('route').setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route
        }
      })
    } else {
      map.value.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route
          }
        }
      })

      map.value.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#0080ff',
          'line-width': 6,
          'line-opacity': 0.8
        }
      })
    }

    let totalDistance = 0
    let totalTrafficWeight = 0
    let segments = 0

    for (let i = 0; i < route.length - 1; i++) {
      const dx = route[i+1][0] - route[i][0]
      const dy = route[i+1][1] - route[i][1]
      const segmentDistance = Math.sqrt(dx * dx + dy * dy)
      totalDistance += segmentDistance
      segments++

      for (let [cellId, cellData] of trafficData.value) {
        const centerDist = Math.sqrt(
          Math.pow(cellData.lat - route[i][1], 2) +
          Math.pow(cellData.lng - route[i][0], 2)
        )
        if (centerDist < 0.01) {
          totalTrafficWeight += cellData.weight
          break
        }
      }
    }

    const distanceKm = (totalDistance * 111).toFixed(1)
    const avgWeight = segments > 0 ? (totalTrafficWeight / segments) : 1.0
    const estimatedTime = Math.round(parseFloat(distanceKm) * avgWeight * 2)

    routeInfo.value =
      '<strong>📍 Distance:</strong> ' + distanceKm + ' km<br>' +
      '<strong>⏱️ Travel Time:</strong> ' + estimatedTime + ' min<br>' +
      '<strong>🚦 Average Load:</strong> ' + avgWeight.toFixed(2) + '<br>' +
      '<small>✅ Traffic load from CSV data considered</small>'
    
    // Show the route panel with the calculated route info
    showRoutePanel.value = true
  } catch (error) {
    console.error('Traffic-aware route calculation error:', error)
    routeInfo.value = '<span style="color: #ff6b6b;">❌ Route calculation error</span>'
  }
}

// Lifecycle
onMounted(() => {
  initializeMap()
})

onUnmounted(() => {
  if (map.value) {
    map.value.remove()
  }
})
</script>

<style scoped>
.traffic-map-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
}

.map-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}



.info-panel {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  max-width: 300px;
  z-index: 1;
}

.route-panel {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 0;
  border-radius: 16px;
  min-width: 80vw;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1000;
  border: 2px solid #e0e0e0;
}

.route-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 15px 20px 0;
  margin-bottom: 0;
}

.close-btn {
  background: #f0f0f0;
  color: #666;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background: #e0e0e0;
  color: #333;
}

.route-content {
  padding: 0 20px 20px;
  color: #333;
}

/* Control Buttons */
.control-buttons {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

.control-btn {
  background: white;
  color: #333;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
  text-align: center;
}

.control-btn:hover {
  background: #f8f9fa;
  border-color: #007bff;
  color: #007bff;
}

.control-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

/* Fade Animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Hide OpenStreetMap attribution */
:deep(.mapboxgl-ctrl-attrib) {
  display: none !important;
}

:deep(.mapboxgl-ctrl-bottom-right) {
  display: none !important;
}

/* Popup styling */
:deep(.mapboxgl-popup-content) {
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 300px;
  position: absolute;
}

:deep(.traffic-popup h3) {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 16px;
  font-weight: 600;
}

:deep(.popup-content p) {
  margin: 5px 0;
  font-size: 14px;
  line-height: 1.4;
}

:deep(.popup-content strong) {
  color: #555;
}

@media (max-width: 768px) {
  .info-panel {
    max-width: 250px;
    font-size: 12px;
    padding: 10px;
  }
  
  .route-panel {
    min-width: 95vw;
    max-width: 95vw;
    max-height: 85vh;
    padding: 0;
  }
  
  .route-header {
    padding: 10px 15px 0;
  }
  
  .route-content {
    padding: 0 15px 15px;
    font-size: 14px;
  }
  
  .control-buttons {
    bottom: 15px;
    right: 15px;
    gap: 8px;
  }
  
  .control-btn {
    padding: 10px 12px;
    font-size: 12px;
    min-width: 100px;
  }
  

  :deep(.mapboxgl-popup-content) {
    max-width: 250px;
    padding: 12px;
  }
  
  :deep(.traffic-popup h3) {
    font-size: 14px;
  }
  
  :deep(.popup-content p) {
    font-size: 12px;
  }
}
</style>