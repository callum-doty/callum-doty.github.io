/**
 * Template Pattern Implementation
 * Base template for consistent HTML page structure
 */

import { CONFIG } from '../config.js';

/**
 * Page Template Manager
 * Provides a standard structure for all pages
 */
export class PageTemplate {
  /**
   * Create the base HTML structure
   * @param {Object} options - Page configuration
   * @param {string} options.title - Page title
   * @param {string} options.content - Main content HTML
   * @param {boolean} options.includeHero - Whether to include homepage hero
   * @returns {void}
   */
  static initialize(options = {}) {
    const {
      title = 'Callum Doty',
      includeHero = false
    } = options;

    // Set page title
    document.title = title;

    // Ensure head elements exist
    this.ensureHeadElements();

    // Add main wrapper if not homepage
    if (!includeHero) {
      this.ensureMainWrapper();
    }
  }

  /**
   * Ensure required head elements are present
   */
  static ensureHeadElements() {
    const head = document.head;

    // Add favicon if not present
    if (!document.querySelector('link[rel="icon"]')) {
      const favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/png';
      favicon.href = CONFIG.PATHS.FAVICON;
      head.appendChild(favicon);
    }

    // Add fonts if not present
    if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
      const preconnect1 = document.createElement('link');
      preconnect1.rel = 'preconnect';
      preconnect1.href = 'https://fonts.googleapis.com';
      head.appendChild(preconnect1);

      const preconnect2 = document.createElement('link');
      preconnect2.rel = 'preconnect';
      preconnect2.href = 'https://fonts.gstatic.com';
      preconnect2.crossOrigin = 'anonymous';
      head.appendChild(preconnect2);

      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap';
      head.appendChild(fontLink);
    }

    // Add styles if not present
    if (!document.querySelector('link[href*="styles.css"]')) {
      const stylesLink = document.createElement('link');
      stylesLink.rel = 'stylesheet';
      stylesLink.href = '/src/styles.css';
      head.appendChild(stylesLink);
    }

    // Add Tailwind if not present
    if (!document.querySelector('script[src*="tailwindcss"]')) {
      const tailwindScript = document.createElement('script');
      tailwindScript.src = 'https://cdn.tailwindcss.com';
      head.appendChild(tailwindScript);
    }
  }

  /**
   * Ensure main wrapper exists for non-homepage pages
   */
  static ensureMainWrapper() {
    if (!document.querySelector('main')) {
      const body = document.body;
      const main = document.createElement('main');
      
      // Move all body children except header into main
      const children = Array.from(body.children);
      children.forEach(child => {
        if (child.tagName !== 'HEADER' && child.tagName !== 'SCRIPT') {
          main.appendChild(child);
        }
      });

      body.appendChild(main);
    }
  }

  /**
   * Get standard page HTML structure
   * @param {string} content - Page content
   * @returns {string}
   */
  static getPageHTML(content) {
    return `
      <head>
        <link rel="icon" type="image/png" href="${CONFIG.PATHS.FAVICON}" />
        <link rel="stylesheet" href="/src/styles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="/src/animation.js" defer></script>
      </head>
      <body>
        <script type="module" src="/src/header.js"></script>
        <main>
          ${content}
        </main>
      </body>
    `;
  }
}
