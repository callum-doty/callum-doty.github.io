import debounce from './utils/debounce.js';
import * as noise from './utils/noise.js';
import { CONFIG } from './config.js';
import { EventEmitter } from './core/EventEmitter.js';
import { CanvasFacade } from './facades/CanvasFacade.js';
import { ScrollAnimationStrategy, DrawAnimationStrategy, MouseInteractionStrategy } from './strategies/AnimationStrategy.js';
import { ClearCanvasCommand, DrawFieldCommand, CommandInvoker } from './commands/CanvasCommand.js';
import { animationFrameManager } from './utils/AnimationFrameManager.js';

export default class HomepageHero extends EventEmitter {
  constructor(elem) {
    super();
    
    this.elem = elem;
    this.noise = noise.noise;
    this.canvas = this.elem.querySelector(`.${CONFIG.CLASSES.HOMEPAGE_HERO_CANVAS}`);
    this.ctx = this.canvas.getContext("2d");
    this.field = null;
    
    // Use configuration constants
    this.size = CONFIG.CANVAS.GRID_SIZE;
    this.lineWidthDefault = CONFIG.CANVAS.LINE_WIDTH_DEFAULT;
    this.lineWidth = this.lineWidthDefault;
    this.lineLengthDefault = CONFIG.CANVAS.LINE_LENGTH_DEFAULT;
    this.defaultRotate = CONFIG.CANVAS.DEFAULT_ROTATE;
    this.lineLength = this.lineLengthDefault;
    this.scrollBuffer = CONFIG.CANVAS.SCROLL_BUFFER;
    
    // Mouse tracking
    this.mx = null;
    this.my = null;
    
    // Animation state
    this.isHovering = false;
    this.isAnimating = false;
    this.isInViewport = true;
    this.isInitialized = false;
    this.unregisterAnimation = null;

    // Initialize patterns
    this.canvasFacade = new CanvasFacade(this.ctx, this.field, this.size);
    this.scrollAnimationStrategy = new ScrollAnimationStrategy(this);
    this.drawAnimationStrategy = new DrawAnimationStrategy(this);
    this.mouseInteractionStrategy = new MouseInteractionStrategy(this);
    this.commandInvoker = new CommandInvoker();

    // Bind methods
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.reset = this.reset.bind(this);

    this.lastClassState = this.elem.classList.contains(CONFIG.CLASSES.IS_SCROLLED);
  }

  mouseMoveHandler(e) {
    const mousePos = this.getMousePos(this.canvas, e);
    this.mx = mousePos.x;
    this.my = mousePos.y;
  }

  handleAnimation(direction) {
    this.scrollAnimationStrategy.execute(direction);
  }



  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  draw(now) {
    this.ctx.lineWidth = this.lineWidth;

    if (this.isInViewport) {
      this.calculateField();
      this.noiseZ = Math.floor(now) * CONFIG.CANVAS.NOISE_Z_SPEED;
      
      // Use Command Pattern for canvas operations
      this.commandInvoker.execute(new ClearCanvasCommand(this.canvasFacade));
      this.commandInvoker.execute(new DrawFieldCommand(this.canvasFacade));
    }
  }

  calculateField() {
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {
        const angle = this.noise.noise3D(
          x / CONFIG.CANVAS.NOISE_SCALE_ANGLE, 
          y / CONFIG.CANVAS.NOISE_SCALE_ANGLE, 
          this.noiseZ
        ) * Math.PI * 2;
        
        const simplexLength = this.noise.noise3D(
          x / CONFIG.CANVAS.NOISE_SCALE_LENGTH + 40000, 
          y / CONFIG.CANVAS.NOISE_SCALE_LENGTH + 40000, 
          this.noiseZ
        );
        let length = simplexLength > 0.25 ? simplexLength : 0.25;
        
        const lightness = (this.noise.noise3D(
          x / CONFIG.CANVAS.NOISE_SCALE_LIGHTNESS + 20000, 
          y / CONFIG.CANVAS.NOISE_SCALE_LIGHTNESS + 20000, 
          this.noiseZ * CONFIG.CANVAS.NOISE_Z_LIGHTNESS_SPEED
        ) + 1) / 2 * 80;

        this.field[x][y][0] = angle;

        // Use Strategy Pattern for mouse interaction
        const particleX = x * this.size;
        const particleY = y * this.size;
        length = this.mouseInteractionStrategy.applyMouseInfluence(particleX, particleY, length);

        this.field[x][y][1] = length;
        this.field[x][y][3] = lightness;
      }
    }
  }

  initField() {
    if (!this.field) {
      this.field = new Array(this.columns);
    }
    for (let x = 0; x < this.columns; x++) {
      if (!this.field[x]) {
        this.field[x] = new Array(this.rows);
      }
      for (let y = 0; y < this.rows; y++) {
        this.field[x][y] = [0, 0, 0, 0];
      }
    }
  }

  handleMouseLeave() {
    this.isHovering = false;
    this.mx = null;
    this.my = null;
  }

  handleMouseEnter() {
    this.isHovering = true;
  }

  reset() {
    const dpr = CONFIG.getDevicePixelRatio();
    const { width, height } = CanvasFacade.setupCanvas(this.canvas, dpr);

    this.w = width;
    this.h = height;
    this.canvasFacade.setDimensions(width, height);
    
    this.noise.seed(Math.random);
    this.columns = Math.floor(this.w / this.size) + 1;
    this.rows = Math.floor(this.h / this.size) + 1;

    this.initField();
    this.canvasFacade.field = this.field;
    
    this.emit('reset', { width: this.w, height: this.h, columns: this.columns, rows: this.rows });
  }

  init() {
    this.reset();
    
    const mutationObserver = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const currentClassState = mutation.target.classList.contains(CONFIG.CLASSES.IS_SCROLLED);
          const scrollPos = window.scrollY;

          if (this.lastClassState === currentClassState) return;
          if (scrollPos > this.elem.offsetHeight) return;

          this.lastClassState = currentClassState;

          if (currentClassState && scrollPos < this.elem.offsetHeight / 2) {
            this.handleAnimation('down');
          } else if (!currentClassState && scrollPos < this.elem.offsetHeight + 10) {
            this.isInViewport = true;
            this.handleAnimation("up");
          }
        }
      }
    });

    mutationObserver.observe(this.elem, { attributes: true });

    // Register animation with AnimationFrameManager
    this.unregisterAnimation = animationFrameManager.register(
      'homepage-hero',
      (timestamp) => this.draw(timestamp)
    );

    if (window.matchMedia('(hover: hover)').matches) {
      this.elem.addEventListener("mousemove", this.mouseMoveHandler);
      this.elem.addEventListener("mouseenter", this.handleMouseEnter);
      this.elem.addEventListener("mouseleave", this.handleMouseLeave);
    }

    window.addEventListener("resize", debounce(this.reset.bind(this), 500));
    
    this.emit('initialized');
  }

  /**
   * Clean up resources and event listeners
   */
  destroy() {
    // Unregister animation from AnimationFrameManager
    if (this.unregisterAnimation) {
      this.unregisterAnimation();
    }
    
    this.scrollAnimationStrategy.cancel();
    this.drawAnimationStrategy.cancel();

    // Remove event listeners
    this.elem.removeEventListener("mousemove", this.mouseMoveHandler);
    this.elem.removeEventListener("mouseenter", this.handleMouseEnter);
    this.elem.removeEventListener("mouseleave", this.handleMouseLeave);
    window.removeEventListener("resize", this.reset);

    // Clear command history
    this.commandInvoker.clearHistory();

    this.removeAllListeners();
    this.emit('destroyed');
  }
}
