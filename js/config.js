/**
 * Configuration Module Pattern
 * Centralized configuration for the entire application
 */

export const CONFIG = {
  // Canvas Animation Settings
  CANVAS: {
    GRID_SIZE: 30,
    LINE_WIDTH_DEFAULT: 2,
    LINE_LENGTH_DEFAULT: 0.5,
    DEFAULT_ROTATE: 0.5,
    ANIMATION_SPEED: 4,
    MAX_MOUSE_DISTANCE: 150,
    MOUSE_GROWTH_FACTOR: 0.75,
    SCROLL_BUFFER: 10,
    NOISE_SCALE_ANGLE: 50,
    NOISE_SCALE_LENGTH: 100,
    NOISE_SCALE_LIGHTNESS: 10,
    NOISE_Z_SPEED: 0.000198,
    NOISE_Z_LIGHTNESS_SPEED: 4
  },

  // CSS Classes
  CLASSES: {
    HOMEPAGE_HERO: 'homepage-hero',
    HOMEPAGE_HERO_CANVAS: 'js-homepage-hero-canvas',
    IS_SCROLLED: 'homepageHero--is-scrolled',
    FADE_OUT: 'fade-out',
    CUSTOM_CARD: 'custom-card',
    CUSTOM_CARD_ICON: 'custom-card-icon'
  },

  // Navigation Links
  NAVIGATION: {
    LEFT: [
      { href: '/', text: 'Home' },
      { href: '/pages/complex.html', text: 'Work' },
      { href: '/pages/about.html', text: 'About' },
      { href: '/pages/blog/index.html', text: 'Blog' }
    ],
    RIGHT: [
      { href: 'https://github.com/callum-doty', text: 'Github', external: true },
      { href: 'https://www.linkedin.com/in/callum-doty-62b501192', text: 'LinkedIn', external: true },
      { href: 'mailto:doty.callum9@gmail.com', text: 'Email', external: true }
    ]
  },

  // Animation Settings
  ANIMATION: {
    PAGE_TRANSITION_DURATION: 250
  },

  // Environment
  ENV: 'production',

  // Paths
  PATHS: {
    CARD_DATA: '/src/cardData.json',
    FAVICON: '/assets/cd.png'
  },

  // Device Pixel Ratio
  getDevicePixelRatio() {
    return (window.devicePixelRatio && window.devicePixelRatio > 1) 
      ? window.devicePixelRatio 
      : 1;
  }
};
