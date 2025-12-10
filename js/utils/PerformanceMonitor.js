/**
 * Performance Monitoring Utilities
 * Track and log performance metrics
 */

import { CONFIG } from '../config.js';

/**
 * Performance Monitor
 * Singleton for tracking performance metrics
 */
class PerformanceMonitor {
  constructor() {
    if (PerformanceMonitor.instance) {
      return PerformanceMonitor.instance;
    }

    this.metrics = new Map();
    this.enabled = false;

    PerformanceMonitor.instance = this;
  }

  /**
   * Enable performance monitoring
   */
  enable() {
    this.enabled = true;
  }

  /**
   * Disable performance monitoring
   */
  disable() {
    this.enabled = false;
  }

  /**
   * Start timing an operation
   * @param {string} label - Operation label
   */
  start(label) {
    if (!this.enabled) return;
    
    this.metrics.set(label, {
      startTime: performance.now(),
      endTime: null,
      duration: null
    });
  }

  /**
   * End timing an operation
   * @param {string} label - Operation label
   * @returns {number|null} - Duration in milliseconds
   */
  end(label) {
    if (!this.enabled) return null;
    
    const metric = this.metrics.get(label);
    if (!metric) {
      console.warn(`No start time found for "${label}"`);
      return null;
    }

    metric.endTime = performance.now();
    metric.duration = metric.endTime - metric.startTime;

    return metric.duration;
  }

  /**
   * Measure a function execution time
   * @param {string} label - Operation label
   * @param {Function} fn - Function to measure
   * @returns {any} - Function return value
   */
  measure(label, fn) {
    if (!this.enabled) return fn();

    this.start(label);
    const result = fn();
    const duration = this.end(label);

    if (duration !== null && duration > 16.67) { // Longer than one frame (60fps)
      console.warn(`Performance warning: "${label}" took ${duration.toFixed(2)}ms`);
    }

    return result;
  }

  /**
   * Measure an async function execution time
   * @param {string} label - Operation label
   * @param {Function} fn - Async function to measure
   * @returns {Promise<any>} - Function return value
   */
  async measureAsync(label, fn) {
    if (!this.enabled) return fn();

    this.start(label);
    const result = await fn();
    const duration = this.end(label);

    if (duration !== null && duration > 100) {
      console.warn(`Performance warning: Async operation "${label}" took ${duration.toFixed(2)}ms`);
    }

    return result;
  }

  /**
   * Get all metrics
   * @returns {Object} - All recorded metrics
   */
  getMetrics() {
    const result = {};
    this.metrics.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  /**
   * Log metrics to console
   */
  log() {
    if (!this.enabled) return;

    console.group('Performance Metrics');
    this.metrics.forEach((metric, label) => {
      if (metric.duration !== null) {
        console.log(`${label}: ${metric.duration.toFixed(2)}ms`);
      }
    });
    console.groupEnd();
  }

  /**
   * Clear all metrics
   */
  clear() {
    this.metrics.clear();
  }

  /**
   * Get memory usage (if available)
   * @returns {Object|null}
   */
  getMemoryUsage() {
    if (performance.memory) {
      return {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
      };
    }
    return null;
  }

  /**
   * Log memory usage
   */
  logMemory() {
    const memory = this.getMemoryUsage();
    if (memory) {
      console.group('Memory Usage');
      console.log(`Used: ${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`);
      console.log(`Total: ${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`);
      console.log(`Limit: ${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`);
      console.groupEnd();
    }
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Enable in development
if (CONFIG.ENV !== 'production') {
  performanceMonitor.enable();
}
