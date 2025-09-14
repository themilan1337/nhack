<template>
  <div class="storytelling-container">
    <!-- Story content overlay -->
    <div class="story-content" ref="storyContainer">
      <header v-if="config.title || config.subtitle" class="story-header">
        <h1 v-if="config.title" class="story-title">{{ config.title }}</h1>
        <h2 v-if="config.subtitle" class="story-subtitle">{{ config.subtitle }}</h2>
        <p v-if="config.byline" class="story-byline">{{ config.byline }}</p>
      </header>

      <div class="story-chapters" ref="chaptersContainer">
        <section
          v-for="(chapter, index) in config.chapters"
          :key="chapter.id"
          :id="chapter.id"
          class="story-chapter"
          :class="[
            alignmentClass,
            themeClass,
            { active: activeChapter === index }
          ]"
          :data-chapter-index="index"
        >
          <div class="chapter-content">
            <h3 v-if="chapter.title" class="chapter-title">{{ chapter.title }}</h3>
            <img v-if="chapter.image" :src="chapter.image" :alt="chapter.title" class="chapter-image" />
            <div v-if="chapter.description" class="chapter-description" v-html="chapter.description"></div>
          </div>
        </section>
      </div>

      <footer v-if="config.footer" class="story-footer">
        <p v-html="config.footer"></p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface ChapterLocation {
  center: [number, number]
  zoom: number
  pitch?: number
  bearing?: number
  speed?: number
}

interface LayerAction {
  layer: string
  opacity: number
  duration?: number
}

interface Chapter {
  id: string
  title?: string
  image?: string
  description?: string
  location: ChapterLocation
  onChapterEnter?: LayerAction[]
  onChapterExit?: LayerAction[]
}

interface StorytellingConfig {
  title?: string
  subtitle?: string
  byline?: string
  footer?: string
  theme?: 'light' | 'dark'
  alignment?: 'left' | 'center' | 'right' | 'full'
  chapters: Chapter[]
}

interface Props {
  config: StorytellingConfig
  mapInstance?: any
}

const props = withDefaults(defineProps<Props>(), {
  config: () => ({ chapters: [] })
})

const emit = defineEmits<{
  chapterChange: [chapter: Chapter, index: number]
  mapMove: [location: ChapterLocation]
}>()

// Reactive references
const storyContainer = ref<HTMLElement>()
const chaptersContainer = ref<HTMLElement>()
const activeChapter = ref<number>(0)
const observer = ref<IntersectionObserver | null>(null)

// Computed properties
const themeClass = computed(() => props.config.theme || 'light')
const alignmentClass = computed(() => {
  const alignments = {
    'left': 'lefty',
    'center': 'centered', 
    'right': 'righty',
    'full': 'fully'
  }
  return alignments[props.config.alignment || 'left']
})

// Methods
const handleChapterIntersection = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const chapterElement = entry.target as HTMLElement
      const chapterIndex = parseInt(chapterElement.dataset.chapterIndex || '0')
      const chapter = props.config.chapters[chapterIndex]
      
      if (chapter && activeChapter.value !== chapterIndex) {
        // Exit previous chapter
        const previousChapter = props.config.chapters[activeChapter.value]
        if (previousChapter?.onChapterExit) {
          handleLayerActions(previousChapter.onChapterExit)
        }
        
        activeChapter.value = chapterIndex
        
        // Enter new chapter
        if (chapter.onChapterEnter) {
          handleLayerActions(chapter.onChapterEnter)
        }
        
        // Emit events
        emit('chapterChange', chapter, chapterIndex)
        emit('mapMove', chapter.location)
      }
    }
  })
}

const handleLayerActions = (actions: LayerAction[]) => {
  if (!props.mapInstance) return
  
  actions.forEach((action) => {
    try {
      const layer = props.mapInstance.getLayer(action.layer)
      if (layer) {
        const layerType = layer.type
        const paintProps = getLayerPaintProperties(layerType)
        
        paintProps.forEach((prop) => {
          if (action.duration) {
            const transitionProp = `${prop}-transition`
            props.mapInstance.setPaintProperty(action.layer, transitionProp, {
              duration: action.duration
            })
          }
          props.mapInstance.setPaintProperty(action.layer, prop, action.opacity)
        })
      }
    } catch (error) {
      console.warn(`Layer ${action.layer} not found or error setting opacity:`, error)
    }
  })
}

const getLayerPaintProperties = (layerType: string): string[] => {
  const layerTypes: Record<string, string[]> = {
    'fill': ['fill-opacity'],
    'line': ['line-opacity'],
    'circle': ['circle-opacity', 'circle-stroke-opacity'],
    'symbol': ['icon-opacity', 'text-opacity'],
    'raster': ['raster-opacity'],
    'fill-extrusion': ['fill-extrusion-opacity'],
    'heatmap': ['heatmap-opacity']
  }
  return layerTypes[layerType] || []
}

const setupIntersectionObserver = () => {
  if (!chaptersContainer.value) return
  
  observer.value = new IntersectionObserver(handleChapterIntersection, {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  })
  
  const chapters = chaptersContainer.value.querySelectorAll('.story-chapter')
  chapters.forEach((chapter) => {
    observer.value!.observe(chapter)
  })
}

const cleanup = () => {
  if (observer.value) {
    observer.value.disconnect()
    observer.value = null
  }
}

// Lifecycle hooks
onMounted(() => {
  setupIntersectionObserver()
})

onUnmounted(() => {
  cleanup()
})

// Watch for config changes
watch(() => props.config.chapters, () => {
  cleanup()
  setTimeout(setupIntersectionObserver, 100)
}, { deep: true })
</script>

<style scoped>
.storytelling-container {
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.story-content {
  position: relative;
  z-index: 10;
  pointer-events: auto;
}

.story-header {
  width: 100%;
  position: relative;
  z-index: 5;
  padding: 2vh 2vw;
  text-align: center;
}

.story-title {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.story-subtitle {
  margin: 1rem 0 0 0;
  font-size: 1.5rem;
  font-weight: 400;
  opacity: 0.8;
}

.story-byline {
  margin: 1rem 0 0 0;
  font-size: 1rem;
  opacity: 0.6;
}

.story-chapters {
  padding-top: 10vh;
  padding-bottom: 10vh;
}

.story-chapter {
  padding-bottom: 50vh;
  opacity: 0.25;
  transition: opacity 0.3s ease;
}

.story-chapter.active {
  opacity: 0.9;
}

.chapter-content {
  padding: 25px 50px;
  line-height: 1.6;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.chapter-title {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.chapter-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin: 1rem 0;
}

.chapter-description {
  margin: 1rem 0 0 0;
}

.story-footer {
  width: 100%;
  min-height: 5vh;
  padding: 2vh 2vw;
  text-align: center;
  font-size: 0.875rem;
  opacity: 0.7;
  position: relative;
  z-index: 5;
}

/* Alignment classes */
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

/* Theme classes */
.light .chapter-content {
  background: rgba(255, 255, 255, 0.95);
  color: #333;
}

.dark .chapter-content {
  background: rgba(68, 68, 68, 0.95);
  color: #fafafa;
}

.dark .story-title,
.dark .story-subtitle,
.dark .story-byline {
  color: #fafafa;
}

.light .story-title,
.light .story-subtitle,
.light .story-byline {
  color: #333;
}

/* Responsive design */
@media (max-width: 768px) {
  .centered,
  .lefty,
  .righty,
  .fully {
    width: 90vw;
    margin: 0 auto;
  }
  
  .chapter-content {
    padding: 20px 25px;
    font-size: 0.9rem;
  }
  
  .story-title {
    font-size: 2rem;
  }
  
  .story-subtitle {
    font-size: 1.25rem;
  }
  
  .chapter-title {
    font-size: 1.25rem;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Fix for mobile touch issues */
.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan,
.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan .mapboxgl-canvas {
  touch-action: unset;
}
</style>