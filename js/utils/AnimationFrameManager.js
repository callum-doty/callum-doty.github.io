/**
 * Singleton Animation Frame Manager
 * Coordinates all animation frames to prevent conflicts and improve performance
 */

class AnimationFrameManager {
  constructor() {
    if (AnimationFrameManager.instance) {
      return AnimationFrameManager.instance;
    }

    this.animations = new Map();
    this.isRunning = false;
    this.frameId = null;

    AnimationFrameManager.instance = this;
  }

  /**
   * Register an animation callback
   * @param {string} id - Unique identifier for the animation
   * @param {Function} callback - Animation callback function
   * @returns {Function} Unregister function
   */
  register(id, callback) {
    this.animations.set(id, callback);
    
    if (!this.isRunning) {
      this.start();
    }

    // Return unregister function
    return () => this.unregister(id);
  }

  /**
   * Unregister an animation
   * @param {string} id - Animation identifier
   */
  unregister(id) {
    this.animations.delete(id);
    
    if (this.animations.size === 0 && this.isRunning) {
      this.stop();
    }
  }

  /**
   * Start the animation loop
   */
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.loop();
  }

  /**
   * Stop the animation loop
   */
  stop() {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }

  /**
   * Main animation loop
   */
  loop(timestamp = performance.now()) {
    if (!this.isRunning) return;

    // Execute all registered animations
    this.animations.forEach((callback, id) => {
      try {
        callback(timestamp);
      } catch (error) {
        console.error(`Error in animation "${id}":`, error);
      }
    });

    this.frameId = requestAnimationFrame((ts) => this.loop(ts));
  }

  /**
   * Get number of active animations
   * @returns {number}
   */
  getActiveCount() {
    return this.animations.size;
  }

  /**
   * Clear all animations
   */
  clear() {
    this.animations.clear();
    this.stop();
  }
}

// Export singleton instance
export const animationFrameManager = new AnimationFrameManager();
