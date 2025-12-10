/**
 * Builder Pattern Implementation
 * Fluent interface for building complex components
 */

import { ComponentFactory } from '../core/ComponentFactory.js';

/**
 * Base Component Builder
 */
export class ComponentBuilder {
  constructor() {
    this.props = {};
  }

  /**
   * Set a property
   * @param {string} key - Property key
   * @param {any} value - Property value
   * @returns {ComponentBuilder} - Returns this for chaining
   */
  set(key, value) {
    this.props[key] = value;
    return this;
  }

  /**
   * Build the component
   * @returns {HTMLElement}
   */
  build() {
    throw new Error('build() must be implemented by subclass');
  }
}

/**
 * Card Component Builder
 */
export class CardBuilder extends ComponentBuilder {
  href(url) {
    return this.set('href', url);
  }

  imagePath(path) {
    return this.set('imagePath', path);
  }

  title(text) {
    return this.set('title', text);
  }

  description(text) {
    return this.set('description', text);
  }

  build() {
    // Validate required fields
    const required = ['href', 'imagePath', 'title', 'description'];
    const missing = required.filter(field => !this.props[field]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }

    return ComponentFactory.render('card', this.props);
  }
}

/**
 * Header Component Builder
 */
export class HeaderBuilder extends ComponentBuilder {
  build() {
    return ComponentFactory.render('header', this.props);
  }
}

/**
 * Builder Factory
 * Creates builders for different component types
 */
export class BuilderFactory {
  /**
   * Create a builder for a component type
   * @param {string} type - Component type
   * @returns {ComponentBuilder}
   */
  static create(type) {
    switch (type) {
      case 'card':
        return new CardBuilder();
      case 'header':
        return new HeaderBuilder();
      default:
        throw new Error(`Unknown builder type: ${type}`);
    }
  }
}
