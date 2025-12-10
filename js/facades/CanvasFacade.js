/**
 * Facade Pattern Implementation
 * Simplifies complex canvas operations
 */

/**
 * Canvas Facade
 * Provides a simplified interface for canvas operations
 */
export class CanvasFacade {
  constructor(ctx, field, size) {
    this.ctx = ctx;
    this.field = field;
    this.size = size;
    this.width = 0;
    this.height = 0;
  }

  /**
   * Update canvas dimensions
   * @param {number} width - Canvas width
   * @param {number} height - Canvas height
   */
  setDimensions(width, height) {
    this.width = width;
    this.height = height;
  }

  /**
   * Clear the canvas
   */
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "#FFF";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.globalCompositeOperation = 'source-over';
  }

  /**
   * Draw a single line particle
   * @param {number} x - Grid X position
   * @param {number} y - Grid Y position
   * @param {number} angle - Rotation angle
   * @param {number} length - Line length
   * @param {number} lightness - Color lightness
   */
  drawParticle(x, y, angle, length, lightness) {
    this.ctx.save();
    this.ctx.translate(x * this.size, y * this.size);
    this.ctx.rotate(angle);
    this.ctx.strokeStyle = `hsl(0, 0%, ${lightness}%)`;
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, (this.size - 10) * length);
    this.ctx.stroke();
    this.ctx.restore();
  }

  /**
   * Draw the entire field
   */
  drawField() {
    const columns = this.field.length;
    const rows = this.field[0]?.length || 0;

    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        const [angle, length, , lightness] = this.field[x][y];
        this.drawParticle(x, y, angle, length, lightness);
      }
    }

    this.ctx.globalCompositeOperation = 'destination-over';
  }

  /**
   * Setup canvas with device pixel ratio
   * @param {HTMLCanvasElement} canvas - Canvas element
   * @param {number} dpr - Device pixel ratio
   */
  static setupCanvas(canvas, dpr) {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    
    return { width: canvas.width, height: canvas.height, ctx };
  }
}
