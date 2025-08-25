export default class HomepageHero {
  constructor(container) {
    this.container = container;
    this.canvas = null;
    this.ctx = null;
    this.animationId = null;
  }

  init() {
    // MIS Unified Background — Vanilla JS (no HTML)
    // Creates a fixed <canvas> behind the page and runs the animation.

    // ---------- Canvas bootstrap (DPR-aware, non-blocking) ----------
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { alpha: false });
    Object.assign(this.canvas.style, {
      position: 'fixed',
      inset: '0',
      width: '100%',
      height: '100%',
      zIndex: '-1',
      pointerEvents: 'none',
    });
    document.body.appendChild(this.canvas);

    let DPR = Math.min(2, window.devicePixelRatio || 1);
    let W = 0, H = 0;

    const resize = () => {
      DPR = Math.min(2, window.devicePixelRatio || 1);
      W = this.canvas.width  = Math.floor(innerWidth * DPR);
      H = this.canvas.height = Math.floor(innerHeight * DPR);
      this.canvas.style.width = innerWidth + 'px';
      this.canvas.style.height = innerHeight + 'px';
      world.reseed();
    };
    addEventListener('resize', resize, { passive: true });

    // ---------- Controls / Parameters ----------
    const params = {
      // Global harmony (DeLone & McLean)
      systemQuality: 0.85,   // smooth integration / less noise
      infoQuality:   0.85,   // visual sharpness (alpha/contrast)
      serviceQuality:0.85,   // stability (damping)

      // Population
      density: 0.0002,      // particles per px^2
      maxEdgesPerNode: 3,    // ANT: cap nearby links

      // Flow field
      k: 0.0017,             // spatial frequency
      timeScale: 0.12,       // temporal frequency
      jitter: 0.15,          // random walk (reduced by systemQuality)
      baseSpeed: 0.005,       // global speed
      damping: 0.96,         // velocity damping (raised by serviceQuality)

      // Social alignment
      socialAlign: 0.45,     // align to local peers

      // Diffusion waves
      waveInterval: 4000,    // ms between seeds
      waveStrength: 1.1,     // impulse strength
      waveDecay: 0.985,      // frame decay

      // Structuration grid / Institutional lattice
      gridStep: 90,          // px at DPR=1
      gridAlpha: 0.06,
      latticePull: 0.035,

      // Rendering
      lineWidth: 1.35,
      antEdgeAlpha: 0.08,
      adoptionAccent: '#2058ff',
      monoStroke: '#0a0a0a',
      bg: '#ffffff',
    };

    // Scale params by quality knobs
    const tuneByQuality = () => {
      jitterScalar   = params.jitter * (1 - 0.5*params.systemQuality);
      dampingScalar  = 1 - (1-params.damping)*(params.serviceQuality);
      gridAlpha      = params.gridAlpha * (0.7 + 0.6*params.infoQuality);
      edgeAlpha      = params.antEdgeAlpha * (0.6 + 0.8*params.infoQuality);
    };
    let jitterScalar = params.jitter, dampingScalar = params.damping, gridAlpha = params.gridAlpha, edgeAlpha = params.antEdgeAlpha;
    tuneByQuality();

    // ---------- Utilities ----------
    const rand = (a,b)=>a + Math.random()*(b-a);
    const clamp = (x,a,b)=>Math.max(a,Math.min(b,x));

    // Field: smooth curl-ish vector without noise lib.
    const field = (x, y, t) => {
      const k = params.k;
      const s1 = Math.sin((y*k*1.7) + 0.6*Math.sin(t*0.7));
      const c1 = Math.cos((x*k*1.3) - 0.9*t);
      const s2 = Math.sin((x*k*0.9) + 0.8*Math.cos(t*0.33));
      const c2 = Math.cos((y*k*1.1) + 0.5*t);
      // curl-like combination
      let fx = s1 + c2*0.7 - s2*0.5;
      let fy = c1 - s1*0.6 + c2*0.4;
      return [fx, fy];
    };

    // ---------- World state ----------
    const world = {
      nodes: [],
      hubs: [],
      edges: [], // transient ANT edges [i,j,alpha,phase]
      wave: {active:false, x:0, y:0, radius:0, strength:0},
      lastWave: 0,

      reseed(){
        const count = Math.floor(W*H*params.density);
        this.nodes = [];
        for(let i=0;i<count;i++){
          this.nodes.push({
            x: Math.random()*W,
            y: Math.random()*H,
            vx: 0, vy: 0,
            life: rand(0,5),
            ttl: rand(8,16),
            adoption: 0, // how "adopted" (Diffusion)
          });
        }

        this.hubs = [];
        this.edges = [];
        this.lastWave = performance.now();
        this.wave.active = false;
      }
    };

    // ---------- Interaction ----------
    const pointer = {x:0, y:0, down:false, has:false};
    addEventListener('mousemove', e => { pointer.x = e.clientX*DPR; pointer.y = e.clientY*DPR; pointer.has = true; }, {passive:true});
    addEventListener('touchmove', e => { const t=e.touches[0]; if(t){ pointer.x=t.clientX*DPR; pointer.y=t.clientY*DPR; pointer.has=true; } }, {passive:true});
    addEventListener('mousedown', ()=> pointer.down=true);
    addEventListener('mouseup',   ()=> pointer.down=false);
    addEventListener('touchstart',()=> pointer.down=true, {passive:true});
    addEventListener('touchend',  ()=> pointer.down=false, {passive:true});

    // ---------- Rendering helpers ----------
    const drawGrid = (t) => {
      this.ctx.save();
      this.ctx.globalAlpha = gridAlpha;
      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 1;

      // Slight structural "breathing" (Structuration)
      const wob = 3*DPR*Math.sin(t*0.2);
      const step = params.gridStep*DPR;

      for(let x=0; x<=W; x+=step){
        this.ctx.beginPath();
        this.ctx.moveTo(x + wob, 0);
        this.ctx.lineTo(x - wob, H);
        this.ctx.stroke();
      }
      for(let y=0; y<=H; y+=step){
        this.ctx.beginPath();
        this.ctx.moveTo(0, y - wob);
        this.ctx.lineTo(W, y + wob);
        this.ctx.stroke();
      }
      this.ctx.restore();
    };

    const drawHubs = (t) => {
      // Hubs removed
    };

    const drawANTEdges = (t) => {
      this.ctx.save();
      this.ctx.lineWidth = 1*DPR;
      for(const e of world.edges){
        const [i, j, alpha, phase] = e;
        const a = world.nodes[i], b = world.nodes[j];
        if(!a || !b) continue;
        const pulsate = (0.6 + 0.4*Math.sin(t*2 + phase));
        this.ctx.globalAlpha = edgeAlpha * alpha * pulsate;
        this.ctx.strokeStyle = '#000';
        this.ctx.beginPath();
        this.ctx.moveTo(a.x, a.y);
        this.ctx.lineTo(b.x, b.y);
        this.ctx.stroke();
      }
      this.ctx.restore();
    };

    // ---------- Physics / Update ----------
    const update = (now, dt) => {
      const t = now*0.001*params.timeScale;

      // Diffusion wave seeding
      if(now - world.lastWave > params.waveInterval){
        world.lastWave = now;
        world.wave.active = true;
        world.wave.x = rand(W*0.2, W*0.8);
        world.wave.y = rand(H*0.2, H*0.8);
        world.wave.radius = 0;
        world.wave.strength = params.waveStrength;
      }
      if(world.wave.active){
        world.wave.radius += 220*DPR*dt; // expand
        world.wave.strength *= params.waveDecay;
        if(world.wave.strength < 0.02) world.wave.active=false;
      }

      // Clear ANT edges
      world.edges.length = 0;

      // Spatial grid for neighbor queries (simple binning)
      const cell = 80*DPR, cols = Math.ceil(W/cell), rows = Math.ceil(H/cell);
      const bins = Array.from({length:cols*rows}, ()=>[]);
      const binIndex = (x,y)=> clamp(Math.floor(x/cell),0,cols-1) + cols*clamp(Math.floor(y/cell),0,rows-1);

      world.nodes.forEach((p, idx) => { bins[binIndex(p.x,p.y)].push(idx); });

      // Update nodes
      const maxConn = params.maxEdgesPerNode;
      world.nodes.forEach((p, i) => {
        // Base flow (Structuration-guided)
        const [fx, fy] = field(p.x, p.y, t);
        let ax = fx, ay = fy;

        // Hub attraction removed

        // Diffusion of Innovations: outward impulse on wavefront
        if(world.wave.active){
          const dx = p.x - world.wave.x, dy = p.y - world.wave.y;
          const d = Math.sqrt(dx*dx + dy*dy)+1e-4;
          const band = Math.abs(d - world.wave.radius);
          if(band < 60*DPR){
            const w = world.wave.strength * (1 - band/(60*DPR));
            ax += (dx/d) * 2.0 * w;
            ay += (dx/d) * 2.0 * w;
            p.adoption = Math.min(1, p.adoption + 0.03); // becomes "adopted"
          }
        }

        // Institutional lattice pressure: nudge toward grid intersections
        const step = params.gridStep*DPR;
        const gx = Math.round(p.x/step)*step, gy = Math.round(p.y/step)*step;
        ax += (gx - p.x)*params.latticePull;
        ay += (gy - p.y)*params.latticePull;

        // Grid-point settling: reduce motion when near intersections
        const distToGrid = Math.sqrt((p.x - gx)*(p.x - gx) + (p.y - gy)*(p.y - gy));
        const settlingRadius = 15*DPR; // radius around grid points where settling occurs
        const gridDamping = distToGrid < settlingRadius ? 
          0.3 + 0.7 * (distToGrid / settlingRadius) : 1.0; // stronger damping closer to grid

        // Task–Technology Fit: reward alignment with nearby grid axis
        const vmag = Math.hypot(p.vx, p.vy) + 1e-6;
        const vxn = p.vx/vmag, vyn = p.vy/vmag;
        const alignX = Math.abs(vxn);  // ~1 when moving horizontally
        const alignY = Math.abs(vyn);  // ~1 when moving vertically
        const fit = Math.max(alignX, alignY);
        const speedBoost = 1 + 0.5*(fit - 0.5); // ranges ~0.75..1.25

        // Social influence: align with local peers
        let alignCount = 0, axN=0, ayN=0, conn=0;
        const bi = binIndex(p.x,p.y);
        const bx = bi % cols, by = Math.floor(bi/cols);
        for(let oy=-1; oy<=1; oy++){
          for(let ox=-1; ox<=1; ox++){
            const cx = bx+ox, cy = by+oy;
            if(cx<0||cy<0||cx>=cols||cy>=rows) continue;
            for(const j of bins[cx + cols*cy]){
              if(j===i) continue;
              const q = world.nodes[j];
              const dx = q.x - p.x, dy = q.y - p.y;
              const d2 = dx*dx + dy*dy;
              if(d2 < (140*DPR)*(140*DPR)){
                // alignment vector
                const m = Math.hypot(q.vx,q.vy) + 1e-6;
                axN += q.vx/m; ayN += q.vy/m; alignCount++;
                // ANT edges (limit per node)
                if(conn < maxConn){
                  world.edges.push([i, j, 1 - d2/((140*DPR)*(140*DPR)), Math.random()*6.28]);
                  conn++;
                }
              }
            }
          }
        }
        if(alignCount>0){
          ax += params.socialAlign * (axN/alignCount);
          ay += params.socialAlign * (ayN/alignCount);
        }

        // Pointer influence (inspect/repel with mouse)
        if(pointer.has){
          const dx = pointer.x - p.x, dy = pointer.y - p.y;
          const d2 = dx*dx + dy*dy + 1e-2;
          const inv = 1/Math.sqrt(d2);
          const sgn = pointer.down ? -1 : 1; // hold to repel
          ax += sgn * 1.0 * dx * inv * 0.6;
          ay += sgn * 1.0 * dy * inv * 0.6;
        }

        // Integrate velocity with grid-point settling
        const base = params.baseSpeed * speedBoost;
        p.vx = (p.vx + ax) * (dampingScalar * gridDamping);
        p.vy = (p.vy + ay) * (dampingScalar * gridDamping);
        p.vx += (Math.random()-0.5) * jitterScalar;
        p.vy += (Math.random()-0.5) * jitterScalar;

        // Position advance
        p.x += p.vx * base;
        p.y += p.vy * base;

        // Wrap softly
        if(p.x < -10) p.x = W+10;
        if(p.x > W+10) p.x = -10;
        if(p.y < -10) p.y = H+10;
        if(p.y > H+10) p.y = -10;

        // Lifecycle (used to vary stroke/alpha subtly)
        p.life += dt;
        if(p.life > p.ttl){ // respawn random
          p.x = Math.random()*W; p.y = Math.random()*H; p.vx=0; p.vy=0;
          p.life = 0; p.ttl = rand(8,16); p.adoption = 0;
        }
      });
    };

    // ---------- Draw ----------
    const draw = (now) => {
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.globalAlpha = 1;
      this.ctx.fillStyle = params.bg;
      this.ctx.fillRect(0,0,W,H);

      const t = now*0.001;

      // Structuration grid behind everything
      drawGrid(t);

      // Hubs removed

      // ANT edges (process-oriented ties)
      drawANTEdges(t);

      // Particle dots (quantitative, clean)
      for(const p of world.nodes){
        // Adoption accent (Diffusion) & monochrome base
        const vmag = Math.hypot(p.vx, p.vy);
        const adopt = p.adoption;
        if(adopt > 0.4 && vmag > 0.6){
          this.ctx.fillStyle = params.adoptionAccent;
          this.ctx.globalAlpha = 0.4 + 0.2*adopt;
        } else {
          this.ctx.fillStyle = params.monoStroke;
          this.ctx.globalAlpha = 0.3 + 0.2*params.infoQuality;
        }

        // Draw dot with constant size
        const dotSize = params.lineWidth * DPR * 2;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, dotSize, 0, Math.PI*2);
        this.ctx.fill();
      }

      // Optional: subtle wavefront ring (for aesthetics / legibility)
      if(world.wave.active){
        this.ctx.globalAlpha = 0.06;
        this.ctx.strokeStyle = params.adoptionAccent;
        this.ctx.lineWidth = 2*DPR;
        this.ctx.beginPath();
        this.ctx.arc(world.wave.x, world.wave.y, world.wave.radius, 0, Math.PI*2);
        this.ctx.stroke();
      }

      this.ctx.globalAlpha = 1;
    };

    // ---------- Main loop ----------
    let last = performance.now();
    const frame = (now) => {
      const dt = Math.min(0.033, (now - last)/1000);
      last = now;
      update(now, dt);
      draw(now);
      this.animationId = requestAnimationFrame(frame);
    };

    // ---------- Initialize ----------
    resize();
    world.reseed();
    this.animationId = requestAnimationFrame(frame);

    // ---------- Optional tiny API ----------
    window.MISBackground = {
      setQuality({system, info, service}={}){
        if(system!==undefined)  params.systemQuality = clamp(system,0,1);
        if(info!==undefined)    params.infoQuality   = clamp(info,0,1);
        if(service!==undefined) params.serviceQuality= clamp(service,0,1);
        tuneByQuality();
      },
      setDensity(mult=1){
        params.density = clamp(params.density*mult, 0.00005, 0.0006);
        world.reseed();
      },
      reseed: ()=> world.reseed(),
    };
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}
