import debounce from './utils/debounce.js';
import * as noise from './utils/noise.js';

export default class HomepageHero {
  constructor(elem) {
    this.elem = elem;
    this.noise = noise.noise;
    this.canvas = this.elem.querySelector(".js-homepage-hero-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.tempField = null;
    this.field = null;
    this.size = 30;
    this.lineWidthDefault = 2;
    this.lineWidth = this.lineWidthDefault;
    this.mx = null;
    this.my = null;
    this.lineLengthDefault = 0.5;
    this.defaultRotate = 0.5;
    this.lineLength = this.lineLengthDefault;
    this.video = this.elem.querySelector("#video");
    this.animationFrameId = null;
    this.isHovering = false;
    this.isAnimating = false;
    this.previousScrollPosition = 0;
    this.isInViewport = true;
    this.scrollBuffer = 10;
    this.animationFrame = null;
    this.isInitialized = false;

    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.reset = this.reset.bind(this);

    this.classes = {
      isScrolled: 'homepageHero--is-scrolled'
    };

    this.lastClassState = this.elem.classList.contains(this.classes.isScrolled);
  }

  mouseMoveHandler(e) {
    const mousePos = this.getMousePos(this.canvas, e);
    this.mx = mousePos.x;
    this.my = mousePos.y;
  }

  handleAnimation(direction) {
    if (this.animationFrame && this.isAnimating) {
        cancelAnimationFrame(this.animationFrame);
    }

    this.isAnimating = true;
    let animationVal = direction === "down" ? 0 : 100;

    const animate = () => {
        if ((direction === "down" && animationVal >= 100) || (direction === "up" && animationVal <= 0)) {
            this.isAnimating = false;
            if (direction === "down") {
                this.isInViewport = false;
            }
            return;
        }

        const speed = 4;  // Adjust this value to control the speed of the animation
        direction === "down" ? animationVal += speed : animationVal -= speed;

        this.lineWidth = Math.floor(this.lineWidthDefault + animationVal * 4 / 9);
        this.animationFrame = requestAnimationFrame(animate);
    };

    this.animationFrame = requestAnimationFrame(animate);
}



  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  drawField() {
    this.tempField = this.field;
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {
        let angle = this.field[x][y][0];

        this.ctx.save();
        this.ctx.translate(x * this.size, y * this.size);
        this.ctx.rotate(angle);
        this.ctx.strokeStyle = `hsl(0, 0%, ${this.field[x][y][3]}%)`;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, (this.size - 10) * this.field[x][y][1]);
        this.ctx.stroke();
        this.ctx.restore();
      }
    }

    this.ctx.globalCompositeOperation = 'destination-over';
  }

  clear() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.ctx.fillStyle = "#FFF";
    this.ctx.fillRect(0, 0, this.w, this.h);

    this.ctx.globalCompositeOperation = 'source-over';
  }

  draw(now) {
    this.ctx.lineWidth = this.lineWidth;

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.animationFrameId = requestAnimationFrame(this.draw.bind(this));

    if (this.isInViewport) {
      this.calculateField();
      this.noiseZ = Math.floor(now) * 0.000198;
      this.clear();
      this.drawField();
    }
  }

  calculateField() {
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {
        let angle = this.noise.noise3D(x / 50, y / 50, this.noiseZ) * Math.PI * 2;
        let simplexLength = this.noise.noise3D(x / 100 + 40000, y / 100 + 40000, this.noiseZ);
        let length =  simplexLength > 0.25 ? simplexLength : 0.25;
        let lightness = (this.noise.noise3D(x / 10 + 20000, y / 10 + 20000, this.noiseZ * 4) + 1) / 2 * 80;

        this.field[x][y][0] = angle;

        if (this.isHovering && this.mx !== null) {
          let particleX = x * this.size;
          let particleY = y * this.size;
          let dx = this.mx - particleX;
          let dy = this.my - particleY;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let maxDistance = 150;

          if (distance < maxDistance) {
            let growth = (1 - (distance / maxDistance)) * 0.75;
            length += growth;
          }
        }

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
    // console.log("reset");
    const dpr = (window.devicePixelRatio && window.devicePixelRatio > 1) ? window.devicePixelRatio : 1;
    const rect = this.canvas.getBoundingClientRect();

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);

    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.noise.seed(Math.random);
    this.columns = Math.floor(this.w / this.size) + 1;
    this.rows = Math.floor(this.h / this.size) + 1;

    // console.table({ w: this.w, h: this.h, columns: this.columns, rows: this.rows, dpr, size: this.size, lineWidth: this.lineWidth, lineLength: this.lineLength, canvasWidth: this.canvas.width, canvasHeight: this.canvas.height});

    this.initField();
  }

  init() {
    this.reset();
    const mutationObserver = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const currentClassState = mutation.target.classList.contains(this.classes.isScrolled);
          const scrollPos = window.scrollY;

          // Do nothing if the class state hasn't changed
          if (this.lastClassState === currentClassState) return;

          // Do nothing if scrollpost if below the height of the hero
          if (scrollPos > this.elem.offsetHeight) return;

          // Update last class state
          this.lastClassState = currentClassState;


          if (currentClassState && scrollPos < this.elem.offsetHeight/2) {
            this.handleAnimation('down');
          } else if(!currentClassState && scrollPos < this.elem.offsetHeight + 10){
            this.isInViewport = true;
            this.handleAnimation("up");
          }
        }
      }
    });

    mutationObserver.observe(this.elem, { attributes: true });


    this.draw(performance.now());

    if (window.matchMedia('(hover: hover)').matches) {
      this.elem.addEventListener("mousemove", this.mouseMoveHandler);
      this.elem.addEventListener("mouseenter", this.handleMouseEnter);
      this.elem.addEventListener("mouseleave", this.handleMouseLeave);
    }

    window.addEventListener("resize", debounce(this.reset.bind(this), 500));
  }
}
