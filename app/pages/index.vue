<template>
    <div>
        <MapboxMap 
            ref="mapboxMap"
            map-id="astana-3d-map" 
            style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100vh;" 
            :options="{
                style: 'mapbox://styles/milan1337/cmfibsuq8003s01s6cslgb9z0',
                center: [71.4306, 51.1283],
                zoom: 15.5,
                pitch: 45,
                bearing: -17.6,
                antialias: true
            }"
            @map-loaded="onMapLoaded"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue'

const mapboxMap = ref(null)

const onMapLoaded = (map) => {
    // Wait for style to load before adding 3D buildings
    map.on('style.load', () => {
        // Insert the layer beneath any symbol layer
        const layers = map.getStyle().layers
        const labelLayerId = layers.find(
            (layer) => layer.type === 'symbol' && layer.layout['text-field']
        ).id

        // Add 3D buildings layer
        map.addLayer(
            {
                'id': 'add-3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',
                    // Use an 'interpolate' expression to add smooth transition
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
            },
            labelLayerId
        )
    })
}
</script>