/**
 * Factory Pattern Implementation
 * Standardized component creation with consistent lifecycle management
 */

import { CONFIG } from '../config.js';
import { isLinkActive, getActiveFontWeight } from '../utils/navigation.js';

/**
 * Base Component class with lifecycle methods
 */
export class Component {
  constructor(props = {}) {
    this.props = props;
    this.element = null;
    this.eventListeners = [];
    this.isDestroyed = false;
  }

  /**
   * Create the component's DOM element
   * @returns {HTMLElement}
   */
  render() {
    throw new Error('render() must be implemented by subclass');
  }

  /**
   * Add event listener with automatic cleanup tracking
   * @param {HTMLElement} element - Element to attach listener to
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   */
  addEventListener(element, event, handler) {
    element.addEventListener(event, handler);
    this.eventListeners.push({ element, event, handler });
  }

  /**
   * Clean up component resources
   */
  destroy() {
    if (this.isDestroyed) return;

    // Remove all event listeners
    this.eventListeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    
    this.eventListeners = [];
    this.isDestroyed = true;

    // Remove element from DOM if it exists
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

/**
 * Card Component
 */
export class CardComponent extends Component {
  render() {
    const { href, imagePath, title, description } = this.props;

    const card = document.createElement('a');
    card.href = href;
    card.className = `${CONFIG.CLASSES.CUSTOM_CARD} cursor-pointer bg-white p-8 rounded-lg shadow-lg flex flex-col`;

    const topRow = document.createElement('div');
    topRow.className = 'flex flex-row items-center';

    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = title;
    img.className = `w-12 h-12 ${CONFIG.CLASSES.CUSTOM_CARD_ICON} mr-4`;

    const titleElement = document.createElement('h2');
    titleElement.className = 'text-lg md:text-xl font-bold';
    titleElement.textContent = title;

    topRow.appendChild(img);
    topRow.appendChild(titleElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.className = 'mt-2';
    descriptionElement.textContent = description;

    card.appendChild(topRow);
    card.appendChild(descriptionElement);

    this.element = card;
    return card;
  }
}

/**
 * Navigation Link Component
 */
export class NavLinkComponent extends Component {
  render() {
    const { href, text, isActive, external } = this.props;
    const fontWeight = isActive ? 'font-bold' : '';
    
    const link = document.createElement('a');
    link.href = href;
    link.className = `text-gray-800 hover:text-indigo-600 px-3 py-2 ${fontWeight}`;
    link.textContent = text;
    
    if (external) {
      link.target = '_blank';
    }

    this.element = link;
    return link;
  }
}

/**
 * Timeline Item Component
 */
export class TimelineItemComponent extends Component {
  render() {
    const { title, description, date, isLarge } = this.props;
    
    const item = document.createElement('div');
    item.className = 'border-l-2 border-indigo-200 pl-8 py-4 relative';
    
    const dot = document.createElement('div');
    dot.className = 'absolute w-4 h-4 bg-indigo-600 rounded-full -left-2 top-4';
    
    const titleElement = document.createElement('h3');
    titleElement.className = isLarge ? 'text-2xl font-bold mb-2' : 'text-xl font-bold';
    titleElement.textContent = title;
    
    const descElement = document.createElement('p');
    descElement.className = isLarge ? 'text-lg text-black' : 'text-black';
    descElement.textContent = description;
    
    item.appendChild(dot);
    item.appendChild(titleElement);
    item.appendChild(descElement);
    
    if (date) {
      const dateElement = document.createElement('p');
      dateElement.className = 'text-black mt-4';
      dateElement.textContent = date;
      item.appendChild(dateElement);
    }
    
    this.element = item;
    return item;
  }
}

/**
 * List Component
 */
export class ListComponent extends Component {
  render() {
    const { items, title } = this.props;
    
    const container = document.createElement('div');
    
    if (title) {
      const titleElement = document.createElement('h4');
      titleElement.className = 'text-xl font-bold mt-6 mb-2';
      titleElement.textContent = title;
      container.appendChild(titleElement);
    }
    
    const list = document.createElement('ul');
    list.className = 'list-disc list-inside text-black';
    
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
    
    container.appendChild(list);
    
    this.element = container;
    return container;
  }
}

/**
 * Section Component
 */
export class SectionComponent extends Component {
  render() {
    const { title, content, className = '' } = this.props;
    
    const section = document.createElement('section');
    section.className = className;
    
    if (title) {
      const titleElement = document.createElement('h2');
      titleElement.className = 'text-4xl font-bold mb-4';
      titleElement.textContent = title;
      section.appendChild(titleElement);
    }
    
    if (typeof content === 'string') {
      const contentElement = document.createElement('div');
      contentElement.innerHTML = content;
      section.appendChild(contentElement);
    } else if (content instanceof HTMLElement) {
      section.appendChild(content);
    } else if (Array.isArray(content)) {
      content.forEach(item => {
        if (item instanceof HTMLElement) {
          section.appendChild(item);
        }
      });
    }
    
    this.element = section;
    return section;
  }
}

/**
 * Container Component
 */
export class ContainerComponent extends Component {
  render() {
    const { children, className = 'container mx-auto px-6 py-12' } = this.props;
    
    const container = document.createElement('div');
    container.className = className;
    
    if (Array.isArray(children)) {
      children.forEach(child => {
        if (child instanceof HTMLElement) {
          container.appendChild(child);
        }
      });
    } else if (children instanceof HTMLElement) {
      container.appendChild(children);
    }
    
    this.element = container;
    return container;
  }
}

/**
 * Paragraph Component
 */
export class ParagraphComponent extends Component {
  render() {
    const { text, className = 'text-lg text-black leading-relaxed', innerHTML } = this.props;
    
    const p = document.createElement('p');
    p.className = className;
    
    if (innerHTML) {
      p.innerHTML = innerHTML;
    } else {
      p.textContent = text;
    }
    
    this.element = p;
    return p;
  }
}

/**
 * Metric Card Component
 */
export class MetricCardComponent extends Component {
  render() {
    const { value, label } = this.props;
    
    const card = document.createElement('div');
    card.className = 'bg-white p-6 rounded-lg shadow';
    
    const valueElement = document.createElement('div');
    valueElement.className = 'text-5xl font-bold text-indigo-600';
    valueElement.textContent = value;
    
    const labelElement = document.createElement('div');
    labelElement.className = 'mt-2 text-black';
    labelElement.textContent = label;
    
    card.appendChild(valueElement);
    card.appendChild(labelElement);
    
    this.element = card;
    return card;
  }
}

/**
 * Grid Component
 */
export class GridComponent extends Component {
  render() {
    const { children, columns = 2, gap = 4 } = this.props;
    
    const grid = document.createElement('div');
    grid.className = `grid grid-cols-1 md:grid-cols-${columns} gap-${gap}`;
    
    if (Array.isArray(children)) {
      children.forEach(child => {
        if (child instanceof HTMLElement) {
          grid.appendChild(child);
        }
      });
    }
    
    this.element = grid;
    return grid;
  }
}

/**
 * Competency Card Component
 */
export class CompetencyCardComponent extends Component {
  render() {
    const { title, color, sections } = this.props;
    
    const card = document.createElement('div');
    card.className = `competency-card competency-card-${color}`;
    
    const titleElement = document.createElement('h4');
    titleElement.className = `text-xl font-bold mb-4 competency-card-title-${color}`;
    titleElement.textContent = title;
    card.appendChild(titleElement);
    
    const sectionsContainer = document.createElement('div');
    sectionsContainer.className = 'space-y-3';
    
    sections.forEach(section => {
      const sectionDiv = document.createElement('div');
      
      const label = document.createElement('span');
      label.className = 'text-sm font-semibold text-gray-600 uppercase tracking-wide';
      label.textContent = section.label;
      sectionDiv.appendChild(label);
      
      const list = document.createElement('ul');
      list.className = 'mt-1 text-black list-disc list-inside ml-2';
      
      section.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
      });
      
      sectionDiv.appendChild(list);
      sectionsContainer.appendChild(sectionDiv);
    });
    
    card.appendChild(sectionsContainer);
    
    this.element = card;
    return card;
  }
}

/**
 * Project Highlight Card Component
 */
export class ProjectHighlightComponent extends Component {
  render() {
    const { href, imagePath, title, problem, approach } = this.props;
    
    const link = document.createElement('a');
    link.href = href;
    link.className = 'project-card-container';
    
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = title;
    img.className = 'project-card-image';
    card.appendChild(img);
    
    const content = document.createElement('div');
    content.className = 'project-card-content';
    
    const titleElement = document.createElement('h3');
    titleElement.className = 'project-card-title';
    titleElement.textContent = title;
    content.appendChild(titleElement);
    
    const problemElement = document.createElement('p');
    problemElement.className = 'project-card-text';
    problemElement.innerHTML = `<strong>Problem:</strong> ${problem}`;
    content.appendChild(problemElement);
    
    const approachElement = document.createElement('p');
    approachElement.className = 'project-card-text';
    approachElement.innerHTML = `<strong>My Approach:</strong> ${approach}`;
    content.appendChild(approachElement);
    
    const ctaElement = document.createElement('div');
    ctaElement.className = 'project-card-cta';
    ctaElement.textContent = 'View Case Study';
    content.appendChild(ctaElement);
    
    card.appendChild(content);
    link.appendChild(card);
    
    this.element = link;
    return link;
  }
}

/**
 * Header Component
 */
export class HeaderComponent extends Component {
  render() {
    const header = document.createElement('header');
    header.className = 'bg-white border-b border-black';

    // Generate desktop left navigation
    const desktopLeftNavLinksHTML = CONFIG.NAVIGATION.LEFT.map(link => {
      const fontWeight = getActiveFontWeight(isLinkActive(link.href));
      return `<span><a href="${link.href}" class="text-gray-800 hover:text-indigo-600 px-3 py-2 ${fontWeight}">${link.text}</a></span>`;
    }).join(' <span class="separator">|</span> ');

    // Generate desktop right navigation
    const desktopRightNavLinksHTML = CONFIG.NAVIGATION.RIGHT.map(link => 
      `<span><a href="${link.href}" target="_blank" class="text-gray-800 hover:text-indigo-600 px-3 py-2">${link.text}</a></span>`
    ).join(' <span class="separator">|</span> ');

    // Generate mobile navigation
    const allNavLinks = [...CONFIG.NAVIGATION.LEFT, ...CONFIG.NAVIGATION.RIGHT];
    const mobileNavLinksHTML = allNavLinks.map(link => {
      const fontWeight = getActiveFontWeight(isLinkActive(link.href));
      const target = link.external ? 'target="_blank"' : '';
      return `<a href="${link.href}" ${target} class="block text-gray-800 hover:text-indigo-600 px-3 py-2 ${fontWeight}">${link.text}</a>`;
    }).join('');

    header.innerHTML = `
      <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        <nav class="hidden md:flex">
          ${desktopLeftNavLinksHTML}
        </nav>
        <nav class="hidden md:flex">
          ${desktopRightNavLinksHTML}
        </nav>
        <div class="md:hidden flex items-center">
          <button id="hamburger-button" class="text-gray-800 focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      <div id="mobile-menu" class="md:hidden hidden">
        <nav class="px-2 pt-2 pb-4 space-y-1 sm:px-3">
          ${mobileNavLinksHTML}
        </nav>
      </div>
    `;

    // Add mobile menu toggle functionality
    const hamburgerButton = header.querySelector('#hamburger-button');
    const mobileMenu = header.querySelector('#mobile-menu');

    const toggleMenu = () => {
      mobileMenu.classList.toggle('hidden');
    };

    this.addEventListener(hamburgerButton, 'click', toggleMenu);

    this.element = header;
    return header;
  }
}

/**
 * Component Factory
 * Creates components based on type
 */
export class ComponentFactory {
  /**
   * Create a component
   * @param {string} type - Component type
   * @param {Object} props - Component properties
   * @returns {Component}
   */
  static create(type, props) {
    switch (type) {
      case 'card':
        return new CardComponent(props);
      case 'navLink':
        return new NavLinkComponent(props);
      case 'header':
        return new HeaderComponent(props);
      case 'timelineItem':
        return new TimelineItemComponent(props);
      case 'list':
        return new ListComponent(props);
      case 'section':
        return new SectionComponent(props);
      case 'container':
        return new ContainerComponent(props);
      case 'paragraph':
        return new ParagraphComponent(props);
      case 'metricCard':
        return new MetricCardComponent(props);
      case 'grid':
        return new GridComponent(props);
      case 'competencyCard':
        return new CompetencyCardComponent(props);
      case 'projectHighlight':
        return new ProjectHighlightComponent(props);
      default:
        throw new Error(`Unknown component type: ${type}`);
    }
  }

  /**
   * Create and render a component
   * @param {string} type - Component type
   * @param {Object} props - Component properties
   * @returns {HTMLElement}
   */
  static render(type, props) {
    const component = this.create(type, props);
    return component.render();
  }
}
