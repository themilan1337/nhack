// Storytelling configuration for Nuxt project
export const storytellingConfig = {
  style: 'mapbox://styles/milan1337/cmfibsuq8003s01s6cslgb9z0', // Using existing style from MapBox.vue
  accessToken: 'pk.eyJ1IjoibWlsYW4xMzM3IiwiYSI6ImNtZmliNGw1NjBqMHUya3F3N2ZlYmI4dGkifQ.1wSnZEu14y4snJroP8xOYA', // From nuxt.config.ts
  showMarkers: false,
  theme: 'dark',
  alignment: 'left',
  title: 'inDrive Journey',
  subtitle: 'Discover the story behind our innovative transportation platform',
  footer: 'Experience the future of ride-sharing with inDrive',
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
};