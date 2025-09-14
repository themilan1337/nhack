export interface ChapterLocation {
  center: [number, number]
  zoom: number
  pitch?: number
  bearing?: number
  speed?: number
}

export interface LayerAction {
  layer: string
  opacity: number
  duration?: number
}

export interface Chapter {
  id: string
  title?: string
  image?: string
  description?: string
  location: ChapterLocation
  onChapterEnter?: LayerAction[]
  onChapterExit?: LayerAction[]
}

export interface StorytellingConfig {
  title?: string
  subtitle?: string
  byline?: string
  footer?: string
  theme?: 'light' | 'dark'
  alignment?: 'left' | 'center' | 'right' | 'full'
  chapters: Chapter[]
}

// Astana-focused storytelling configuration
export const astanaStoryConfig: StorytellingConfig = {
  title: 'Discovering Astana',
  subtitle: 'A Journey Through Kazakhstan\'s Modern Capital',
  byline: 'Explore the architectural marvels and cultural landmarks',
  footer: 'Created with Mapbox GL JS and Vue 3',
  theme: 'light',
  alignment: 'left',
  chapters: [
    {
      id: 'overview',
      title: 'Welcome to Astana',
      description: `
        <p>Astana, now known as Nur-Sultan, is the capital city of Kazakhstan. This modern metropolis rose from the steppes to become one of the most futuristic cities in Central Asia.</p>
        <p>Join us on a journey through its most iconic landmarks and architectural wonders.</p>
      `,
      location: {
        center: [71.4704, 51.1694],
        zoom: 11,
        pitch: 45,
        bearing: 0,
        speed: 0.8
      },
      onChapterEnter: [
        {
          layer: 'satellite',
          opacity: 1,
          duration: 1000
        }
      ],
      onChapterExit: [
        {
          layer: 'satellite',
          opacity: 0.5,
          duration: 500
        }
      ]
    },
    {
      id: 'bayterek',
      title: 'Bayterek Tower',
      description: `
        <p>The Bayterek Tower is the symbol of Astana, standing 97 meters tall. This monument represents a Kazakh legend about a sacred tree and a magic bird of happiness.</p>
        <p>The tower offers panoramic views of the city and houses the handprint of the first President of Kazakhstan.</p>
      `,
      location: {
        center: [71.4297, 51.1282],
        zoom: 16,
        pitch: 60,
        bearing: 45,
        speed: 0.6
      },
      onChapterEnter: [
        {
          layer: 'buildings-3d',
          opacity: 1,
          duration: 1500
        }
      ]
    },
    {
      id: 'akorda',
      title: 'Ak Orda Presidential Palace',
      description: `
        <p>The Ak Orda Presidential Palace serves as the workplace of the President of Kazakhstan. Its distinctive blue and gold dome is visible from across the city.</p>
        <p>The palace represents the blend of traditional Kazakh architecture with modern design elements.</p>
      `,
      location: {
        center: [71.4394, 51.1367],
        zoom: 17,
        pitch: 50,
        bearing: 180,
        speed: 0.5
      },
      onChapterEnter: [
        {
          layer: 'water',
          opacity: 0.8,
          duration: 1000
        }
      ]
    },
    {
      id: 'khan-shatyr',
      title: 'Khan Shatyr Entertainment Center',
      description: `
        <p>Khan Shatyr is the world's largest tent-shaped building, designed by renowned architect Norman Foster. This entertainment center houses shops, restaurants, and even an indoor beach resort.</p>
        <p>The transparent material allows natural light while maintaining comfortable temperatures year-round.</p>
      `,
      location: {
        center: [71.4083, 51.1328],
        zoom: 16,
        pitch: 40,
        bearing: 270,
        speed: 0.7
      },
      onChapterEnter: [
        {
          layer: 'roads',
          opacity: 1,
          duration: 800
        }
      ]
    },
    {
      id: 'hazrat-sultan',
      title: 'Hazrat Sultan Mosque',
      description: `
        <p>The Hazrat Sultan Mosque is one of the largest mosques in Central Asia, capable of accommodating 10,000 worshippers. Its stunning white marble facade and golden domes make it a architectural masterpiece.</p>
        <p>The mosque combines traditional Islamic architecture with modern construction techniques.</p>
      `,
      location: {
        center: [71.4653, 51.1153],
        zoom: 16,
        pitch: 30,
        bearing: 90,
        speed: 0.6
      },
      onChapterEnter: [
        {
          layer: 'parks',
          opacity: 0.9,
          duration: 1200
        }
      ]
    },
    {
      id: 'expo-2017',
      title: 'Expo 2017 Site',
      description: `
        <p>The former Expo 2017 site showcased "Future Energy" and sustainable technologies. The iconic Nur Alem sphere, now a museum, represents Kazakhstan's commitment to renewable energy.</p>
        <p>This area has been transformed into a modern district with parks, museums, and cultural facilities.</p>
      `,
      location: {
        center: [71.4539, 51.0889],
        zoom: 15,
        pitch: 35,
        bearing: 45,
        speed: 0.8
      },
      onChapterEnter: [
        {
          layer: 'green-spaces',
          opacity: 1,
          duration: 1000
        }
      ]
    },
    {
      id: 'ishim-river',
      title: 'Ishim River Embankment',
      description: `
        <p>The Ishim River flows through the heart of Astana, providing a natural corridor that divides the old and new parts of the city. The embankment offers beautiful walking paths and recreational areas.</p>
        <p>During winter, the river freezes completely, creating unique opportunities for winter activities.</p>
      `,
      location: {
        center: [71.4461, 51.1500],
        zoom: 14,
        pitch: 20,
        bearing: 0,
        speed: 0.9
      },
      onChapterEnter: [
        {
          layer: 'water',
          opacity: 1,
          duration: 1500
        },
        {
          layer: 'bridges',
          opacity: 0.8,
          duration: 1000
        }
      ]
    },
    {
      id: 'conclusion',
      title: 'Modern Astana',
      description: `
        <p>Astana represents Kazakhstan's vision for the future - a modern, sustainable city that honors its cultural heritage while embracing innovation and progress.</p>
        <p>From the steppes to the stars, this city continues to evolve and inspire visitors from around the world.</p>
      `,
      location: {
        center: [71.4704, 51.1694],
        zoom: 12,
        pitch: 60,
        bearing: 360,
        speed: 1.2
      },
      onChapterEnter: [
        {
          layer: 'satellite',
          opacity: 0.7,
          duration: 2000
        },
        {
          layer: 'buildings-3d',
          opacity: 0.9,
          duration: 1500
        }
      ]
    }
  ]
}

// Alternative configuration for different themes
export const astanaStoryConfigDark: StorytellingConfig = {
  ...astanaStoryConfig,
  theme: 'dark',
  alignment: 'center'
}

export const astanaStoryConfigRight: StorytellingConfig = {
  ...astanaStoryConfig,
  alignment: 'right'
}