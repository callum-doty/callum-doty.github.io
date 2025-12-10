/**
 * Strategy Pattern Implementation
 * Different animation strategies for the homepage hero
 */

import { CONFIG } from '../config.js';

/**
 * Base Animation Strategy
 */
export class AnimationStrategy {
  constructor(context) {
    this.context = context;
  }

  /**
   * Execute the animation
   * @param {string} direction - Animation direction
   */
  execute(direction) {
    throw new Error('execute() must be implemented by subclass');
  }

  /**
   * Cancel the animation
   */
  cancel() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }
}

/**
 * Scroll Animation Strategy
 * Handles the line width animation on scroll
 */
export class ScrollAnimationStrategy extends AnimationStrategy {
  execute(direction) {
    this.cancel();

    this.context.isAnimating = true;
    let animationVal = direction === "down" ? 0 : 100;

    const animate = () => {
      const isComplete = 
        (direction === "down" && animationVal >= 100) || 
        (direction === "up" && animationVal <= 0);

      if (isComplete) {
        this.context.isAnimating = false;
        if (direction === "down") {
          this.context.isInViewport = false;
        }
        this.context.emit('animationComplete', { direction });
        return;
      }

      const speed = CONFIG.CANVAS.ANIMATION_SPEED;
      direction === "down" ? animationVal += speed : animationVal -= speed;

      this.context.lineWidth = Math.floor(
        this.context.lineWidthDefault + animationVal * 4 / 9
      );
      
      this.animationFrame = requestAnimationFrame(animate);
    };

    this.animationFrame = requestAnimationFrame(animate);
  }
}

/**
 * Draw Animation Strategy
 * Handles the continuous drawing loop
 */
export class DrawAnimationStrategy extends AnimationStrategy {
  execute(timestamp) {
    this.context.ctx.lineWidth = this.context.lineWidth;

    this.cancel();
    this.animationFrame = requestAnimationFrame(this.execute.bind(this));

    if (this.context.isInViewport) {
      this.context.calculateField();
      this.context.noiseZ = Math.floor(timestamp) * CONFIG.CANVAS.NOISE_Z_SPEED;
      this.context.canvasFacade.clear();
      this.context.canvasFacade.drawField();
    }
  }
}

/**
 * Mouse Interaction Strategy
 * Handles mouse hover effects
 */
export class MouseInteractionStrategy {
  constructor(context) {
    this.context = context;
  }

  /**
   * Calculate mouse influence on a particle
   * @param {number} particleX - Particle X position
   * @param {number} particleY - Particle Y position
   * @param {number} baseLength - Base length value
   * @returns {number} - Modified length
   */
  applyMouseInfluence(particleX, particleY, baseLength) {
    if (!this.context.isHovering || this.context.mx === null) {
      return baseLength;
    }

    const dx = this.context.mx - particleX;
    const dy = this.context.my - particleY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < CONFIG.CANVAS.MAX_MOUSE_DISTANCE) {
      const growth = 
        (1 - (distance / CONFIG.CANVAS.MAX_MOUSE_DISTANCE)) * 
        CONFIG.CANVAS.MOUSE_GROWTH_FACTOR;
      return baseLength + growth;
    }

    return baseLength;
  }
}
