export default class HomepageHero {
  constructor(elem) {
    this.elem = elem;
    this.canvas = null;
    this.ctx = null;
    this.animationId = null;
    this.mouse = { x: -1e6, y: -1e6, down: false };
    this.particles = [];
    this.pathFns = [];
    this.W = 0;
    this.H = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
  }

  init() {
    // Find or create canvas
    this.canvas = this.elem.querySelector('.js-homepage-hero-canvas');
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.className = 'js-homepage-hero-canvas';
      this.elem.appendChild(this.canvas);
    }
    
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    
    Object.assign(this.canvas.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '0'
    });

    // Color palette
    this.COLORS = {
      'slate': '#222021',
      'charcoal': '#1E293B',
      'ash': '#94A3B8',
      'platinum': '#E2E8F0',
      'amber': '#F59E0B',
      'slate-light': '#151B2B',
      'charcoal-light': '#2D3B52',
      'ash-dark': '#6B7A92',
      'amber-bright': '#FBBF24',
      'amber-dim': '#D97706'
    };

    this.BG = '#222021';
    this.INK = '#E2E8F0';

    // Settings
    this.S = {
      count: 1000,
      size: 0.055,
      variance: 0.45,
      travel_speed: 0.0003,
      density: 0.55,
      hub_nodes: 9,
      hover_glow: 0.55,
      hover_str: 0.18,
      hover_rad: 90,
      trail_length: 4,
      trail_fade: 0.15
    };

    // Color schemes per path
    this.pathColorSchemes = [
      ['amber', 'amber-bright', 'amber-dim'],
      ['platinum', 'ash', 'ash-dark'],
      ['charcoal-light', 'ash', 'platinum'],
      ['amber-dim', 'amber', 'amber-bright'],
      ['ash-dark', 'ash', 'charcoal-light'],
      ['amber-bright', 'amber', 'ash'],
      ['platinum', 'charcoal-light', 'ash-dark'],
      ['amber', 'ash', 'platinum'],
      ['charcoal-light', 'ash-dark', 'amber-dim']
    ];

    // Setup event listeners
    this.setupEventListeners();

    // Initialize
    this.resize();
    this.animationId = requestAnimationFrame(this.frame.bind(this));
  }

  buildBezierPath(startX, startY, hubX, hubY, curveStrength) {
    const dx = startX - hubX;
    const cp1x = hubX + dx * (0.32 + curveStrength * 0.1);
    const cp2x = hubX + dx * (0.45 + curveStrength * 0.001);
    const cp1y = hubY + (startY - hubY) * 0.01;
    const cp2y = hubY + (startY - hubY) * 1;

    return function sample(t) {
      const mt = 1 - t;
      const x = mt*mt*mt*hubX + 3*mt*mt*t*cp1x + 3*mt*t*t*cp2x + t*t*t*startX;
      const y = mt*mt*mt*hubY + 3*mt*mt*t*cp1y + 3*mt*t*t*cp2y + t*t*t*startY;
      return [x, y];
    };
  }

  buildPaths() {
    const isNarrow = window.matchMedia('(max-width: 580px)').matches;
    this.S.hub_nodes = isNarrow ? 6 : 9;

    const hubX = this.W * 0.02;
    const hubY = this.H * 0.53;
    const spreadX = this.W * 0.98;

    this.pathFns = [];

    for (let i = 0; i < this.S.hub_nodes; i++) {
      const targetY = this.H * 0.10 + (i / (this.S.hub_nodes - 1)) * this.H * 0.80;
      const raw = this.buildBezierPath(spreadX, targetY, hubX, hubY, 0.9);
      this.pathFns.push(raw);
    }
  }

  resolveColor(key) {
    return this.COLORS[key] || this.COLORS['platinum'];
  }

  spawnParticle(p, pathIndex) {
    const pathFn = this.pathFns[pathIndex];
    if (!pathFn) return;

    p.offsetX = 0;
    p.offsetY = 0;
    p.path_fn = pathFn;
    p.pathIndex = pathIndex;
    p.seed = Math.random();
    p.path_t = Math.random();
    
    const colorScheme = this.pathColorSchemes[pathIndex % this.pathColorSchemes.length];
    const colorKey = colorScheme[Math.floor(Math.random() * colorScheme.length)];
    p.color = this.resolveColor(colorKey);
    
    const depthLayer = pathIndex / Math.max(1, this.S.hub_nodes - 1);
    const baseDepthSize = 0.7 + depthLayer * 0.6;
    
    const sizeE = 4.5 * Math.pow(Math.random(), 2.2);
    p.size_var = Math.max(0.15, 1 - this.S.variance + this.S.variance * sizeE);
    p.size_override = (Math.random() < 0.08 ? 1 + 0.5 * Math.random() : 0.4 + 0.3 * Math.random()) * baseDepthSize;
    p.alpha = 1;
    p.hover_k = 0;
    p.visible = p.seed <= this.S.density;
    p.trail = [];
    p.x = 0;
    p.y = 0;
  }

  initParticles() {
    const perPath = Math.floor(this.S.count * 0.95 / this.S.hub_nodes);
    this.particles = [];

    for (let pi = 0; pi < this.S.hub_nodes; pi++) {
      for (let j = 0; j < perPath; j++) {
        const p = {
          seed: 0, path_t: 0, offsetX: 0, offsetY: 0, path_fn: null, color: '',
          size_override: 1, size_var: 1, alpha: 1, x: 0, y: 0, hover_k: 0, visible: false,
          trail: []
        };
        this.spawnParticle(p, pi);
        this.particles.push(p);
      }
    }
  }

  resize() {
    this.W = Math.max(1, Math.floor(this.canvas.getBoundingClientRect().width || window.innerWidth));
    this.H = Math.max(1, Math.floor(this.canvas.getBoundingClientRect().height || window.innerHeight));
    this.canvas.width = Math.floor(this.W * this.dpr);
    this.canvas.height = Math.floor(this.H * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.buildPaths();
    this.initParticles();
  }

  draw() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.W, this.H);

    // Draw dashed guide paths
    this.ctx.save();
    this.ctx.lineWidth = 0.6;
    this.ctx.lineCap = 'butt';
    this.ctx.setLineDash([4, 4]);
    this.ctx.strokeStyle = this.INK;
    this.ctx.globalAlpha = 0.18;

    const hubX = this.W * 0.02;
    const hubY = this.H * 0.53;
    const spreadX = this.W * 0.98;

    for (let i = 0; i < this.S.hub_nodes; i++) {
      const targetY = this.H * 0.10 + (i / (this.S.hub_nodes - 1)) * this.H * 0.80;
      const rawFn = this.buildBezierPath(spreadX, targetY, hubX, hubY, 0.9);
      this.ctx.beginPath();
      for (let s = 0; s <= 160; s++) {
        const [x, y] = rawFn(s / 160);
        s === 0 ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y);
      }
      this.ctx.stroke();
    }
    this.ctx.globalAlpha = 1;
    this.ctx.restore();

    // Update & draw particles
    for (const p of this.particles) {
      if (!p.visible || !p.path_fn) continue;

      p.path_t = (p.path_t + this.S.travel_speed * (0.8 + p.seed * 0.4)) % 1;
      p.alpha = p.path_t < 0.06 ? p.path_t / 0.06 : p.path_t > 0.94 ? (1 - p.path_t) / 0.06 : 1;

      const [x, y] = p.path_fn(p.path_t);
      
      p.trail.unshift({ x: p.x, y: p.y });
      if (p.trail.length > this.S.trail_length) p.trail.pop();
      
      p.x = x;
      p.y = y;

      // Hover glow
      let hoverK = 0;
      if (this.mouse.x > -9e5) {
        const dist = Math.hypot(p.x - this.mouse.x, p.y - this.mouse.y);
        const rad = Math.max(30, 1.6 * this.S.hover_rad);
        if (dist < rad) hoverK = Math.pow(1 - dist / rad, 2);
      }
      p.hover_k += (hoverK - p.hover_k) * 0.18;

      const glow = this.S.hover_glow * p.hover_k;
      const radiusMul = 1 + 0.9 * glow;
      const alphaMul = 1 + 0.35 * glow;
      const radius = 25 * this.S.size * p.size_override * p.size_var * radiusMul;
      const finalAlpha = Math.min(1, p.alpha * alphaMul);

      if (finalAlpha < 0.01) continue;

      // Draw motion blur trail
      if (p.trail.length > 1) {
        for (let i = 0; i < p.trail.length; i++) {
          const trailPoint = p.trail[i];
          const trailAlpha = finalAlpha * (1 - i / p.trail.length) * this.S.trail_fade;
          if (trailAlpha < 0.01) continue;
          
          const trailRadius = radius * (1 - i / p.trail.length * 0.5);
          this.ctx.globalAlpha = trailAlpha;
          this.ctx.beginPath();
          this.ctx.arc(trailPoint.x, trailPoint.y, trailRadius, 0, Math.PI * 2);
          this.ctx.fillStyle = p.color;
          this.ctx.fill();
        }
      }

      // Draw main particle
      if (finalAlpha < 1) this.ctx.globalAlpha = finalAlpha;
      else this.ctx.globalAlpha = 1;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    }
  }

  frame() {
    this.draw();
    this.animationId = requestAnimationFrame(this.frame.bind(this));
  }

  setupEventListeners() {
    this.onResize = () => this.resize();
    this.onMove = (e) => { 
      this.mouse.x = e.clientX; 
      this.mouse.y = e.clientY; 
    };
    this.onDown = () => { this.mouse.down = true; };
    this.onUp = () => { this.mouse.down = false; };
    this.onLeave = () => { 
      this.mouse.x = -1e6; 
      this.mouse.y = -1e6; 
      this.mouse.down = false; 
    };

    window.addEventListener('resize', this.onResize);
    this.canvas.addEventListener('pointermove', this.onMove);
    this.canvas.addEventListener('pointerdown', this.onDown);
    this.canvas.addEventListener('pointerup', this.onUp);
    this.canvas.addEventListener('pointerleave', this.onLeave);
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    // Remove event listeners
    if (this.canvas) {
      window.removeEventListener('resize', this.onResize);
      this.canvas.removeEventListener('pointermove', this.onMove);
      this.canvas.removeEventListener('pointerdown', this.onDown);
      this.canvas.removeEventListener('pointerup', this.onUp);
      this.canvas.removeEventListener('pointerleave', this.onLeave);
    }
    
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}
