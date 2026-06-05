import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionValue, useSpring } from 'framer-motion';

/* ── LOADER ────────────────────────────────────────────────────────── */
export const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('BOOTING SYSTEM...');
  const msgs = ['BOOTING SYSTEM...', 'LOADING ASSETS...', 'RENDERING GLITCH...', '// ACCESS GRANTED'];

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 6;
      if (p > 100) p = 100;
      setProgress(p);
      setStatus(msgs[Math.min(Math.floor(p / 26), 3)]);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 600);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          id="loader"
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src="/logo.png"
            alt="NAK"
            className="loader-logo-img"
            animate={{ filter: ['drop-shadow(0 0 20px #FF00FF)', 'drop-shadow(0 0 60px #00FFFF)', 'drop-shadow(0 0 20px #FF00FF)'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="loader-bar-wrap">
            <motion.div
              className="loader-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          <motion.div
            className="loader-txt"
            key={status}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {status}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ── CUSTOM CURSOR (Hunter-Seeker Drone) ────────────────────────── */
export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const pupilRef = useRef(null);

  useEffect(() => {
    let velX = 0;
    let velY = 0;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let rafId;

    const move = (e) => {
      if (!cursorRef.current) return;
      const x = e.clientX;
      const y = e.clientY;
      
      cursorRef.current.style.left = x + 'px';
      cursorRef.current.style.top  = y + 'px';

      velX = x - lastX;
      velY = y - lastY;
      lastX = x;
      lastY = y;
    };

    const update = () => {
      // Decay velocity slowly so eye drifts back to center smoothly
      velX *= 0.85;
      velY *= 0.85;

      if (pupilRef.current) {
        // Constrain pupil inside socket
        const maxDist = 6; 
        const dist = Math.hypot(velX, velY);
        let px = velX, py = velY;
        if (dist > maxDist) {
           px = (velX / dist) * maxDist;
           py = (velY / dist) * maxDist;
        }
        pupilRef.current.style.transform = `translate(${px}px, ${py}px)`;
      }
      
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);

    const down = () => {
      if (cursorRef.current) cursorRef.current.classList.add('clicking');
      if (pupilRef.current) pupilRef.current.style.backgroundColor = '#FF0000'; // Turn red on click
    };
    const up = () => {
      if (cursorRef.current) cursorRef.current.classList.remove('clicking');
      if (pupilRef.current) pupilRef.current.style.backgroundColor = '#00FF41';
    };

    const click = (e) => {
      // Orbital Laser Strike
      const laser = document.createElement('div');
      laser.className = 'drone-laser';
      laser.style.left = e.clientX + 'px';
      // Stretch from top of screen down to the click point
      laser.style.top = '0px';
      laser.style.height = e.clientY + 'px';
      document.body.appendChild(laser);
      
      // Laser hits ground and sparks
      setTimeout(() => {
        const burstWords = ['[KILL_PROC]', '0xDEAD', 'SYS_ERR', 'NULL'];
        const count = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < count; i++) {
          const frag = document.createElement('div');
          frag.className = 'glitch-burst glitch-burst-frag drone-spark';
          frag.textContent = burstWords[Math.floor(Math.random() * burstWords.length)];
          const angle = (i / count) * Math.PI * 2;
          const radius = 20 + Math.random() * 30;
          frag.style.left = (e.clientX + Math.cos(angle) * radius) + 'px';
          frag.style.top  = (e.clientY + Math.sin(angle) * radius) + 'px';
          document.body.appendChild(frag);
          setTimeout(() => frag.remove(), 600);
        }
      }, 50);

      setTimeout(() => laser.remove(), 250);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup',   up);
    window.addEventListener('click',     click);
    
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup',   up);
      window.removeEventListener('click',     click);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div id="drone-cursor" ref={cursorRef}>
      <svg width="40" height="40" viewBox="0 0 40 40" className="drone-svg">
        <circle cx="20" cy="20" r="16" fill="none" stroke="#00FF41" strokeWidth="1" strokeDasharray="4 8" className="drone-ring" />
        <circle cx="20" cy="20" r="10" fill="rgba(0,20,0,0.8)" stroke="#00FF41" strokeWidth="1.5" />
        <line x1="20" y1="2" x2="20" y2="8" stroke="#00FF41" strokeWidth="1.5" />
        <line x1="20" y1="32" x2="20" y2="38" stroke="#00FF41" strokeWidth="1.5" />
        <line x1="2" y1="20" x2="8" y2="20" stroke="#00FF41" strokeWidth="1.5" />
        <line x1="32" y1="20" x2="38" y2="20" stroke="#00FF41" strokeWidth="1.5" />
      </svg>
      <div className="drone-pupil-wrap">
        <div className="drone-pupil" ref={pupilRef}></div>
      </div>
    </div>
  );
};

/* ── AMBIENT CURSOR GLOW ───────────────────────────────────────────── */
export const AmbientGlow = () => {
  const glowRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = e.clientX + 'px';
      glowRef.current.style.top  = e.clientY + 'px';
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return <div id="ambient-glow" ref={glowRef} />;
};

/* ── ANIME MOUSE DRAWING ───────────────────────────────────────────── */
const drawAnimeMouse = (ctx, x, y, frame, state, vx, target) => {
  ctx.save();
  ctx.translate(x, y);
  
  const isEating = state === 'feeding';
  
  // By default, the drawing below faces LEFT (head at negative x).
  // If it's moving RIGHT (vx > 0), or if it's eating a target to its RIGHT, flip it to face RIGHT.
  let faceRight = false;
  if (!isEating && vx > 0) faceRight = true;
  if (isEating && target && target.x > x) faceRight = true;
  
  if (faceRight) ctx.scale(-1, 1);
  
  ctx.scale(1.2, 1.2); 

  // Clean, vector wireframe look
  ctx.strokeStyle = '#00FF41'; // Fully green outline
  ctx.lineWidth = 1.5;
  ctx.fillStyle = 'rgba(0,0,0,0.8)'; // Dark fill to hide the background beneath

  // Tail (wire) - drawn first so it's behind body
  ctx.beginPath();
  ctx.moveTo(10, 0);
  // Smooth, slow tail wag
  const tailWag = isEating ? Math.sin(frame * 0.1) * 3 : Math.sin(frame * 0.05) * 5;
  ctx.quadraticCurveTo(16, tailWag, 22, -tailWag);
  ctx.stroke();

  // Feet
  ctx.fillStyle = '#00FF41';
  // Slow foot movement
  const footMove = isEating ? 0 : Math.sin(frame * 0.15) * 3;
  ctx.fillRect(-5 + footMove, 6, 2, 3);
  ctx.fillRect(4 - footMove, 6, 2, 3);

  // Main body
  ctx.fillStyle = 'rgba(0,0,0,0.8)';
  ctx.beginPath();
  ctx.ellipse(0, 0, 10, 6, 0, 0, Math.PI*2);
  ctx.fill(); ctx.stroke();

  // Head (facing left)
  ctx.beginPath();
  ctx.ellipse(-8, -1, 5, 4, 0, 0, Math.PI*2);
  ctx.fill(); ctx.stroke();

  // Ears
  ctx.beginPath();
  ctx.arc(-5, -6, 3, 0, Math.PI*2);
  ctx.fill(); ctx.stroke();

  // Cybernetic Eye
  ctx.fillStyle = isEating 
    ? (frame % 30 < 15 ? '#FF0000' : '#FFFF00') // Slower flash when eating
    : '#00FF41';
  ctx.beginPath();
  ctx.arc(-10, -2, 1.5, 0, Math.PI*2);
  ctx.fill();

  // Eating Jaw animation (slower)
  if (isEating && frame % 16 < 8) {
    ctx.strokeStyle = '#00FF41';
    ctx.beginPath();
    ctx.moveTo(-11, 2);
    ctx.lineTo(-14, 4);
    ctx.lineTo(-8, 4);
    ctx.stroke();
  }

  ctx.restore();
};

/* ── CANVAS BACKGROUND (Cracks + BSOD + Crawlers) ────────────────── */
export const CanvasBackground = () => {
  const bgRef = useRef(null);
  const corrRef = useRef(null);
  const mouseCanvasRef = useRef(null); // High z-index canvas for mice
  const mouseRef = useRef({ x: 0, y: 0, px: window.innerWidth / 2, py: window.innerHeight / 2 });

  useEffect(() => {
    const bgCanvas = bgRef.current;
    const corrCanvas = corrRef.current;
    const mCanvas = mouseCanvasRef.current;
    if (!bgCanvas || !corrCanvas || !mCanvas) return;
    
    const bgCtx = bgCanvas.getContext('2d');
    const corrCtx = corrCanvas.getContext('2d');
    const mCtx = mCanvas.getContext('2d');
    let W, H, rafId;

    const resize = () => {
      W = bgCanvas.width = corrCanvas.width = mCanvas.width = window.innerWidth;
      H = bgCanvas.height = corrCanvas.height = mCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const trackMouse = (e) => {
      mouseRef.current = { 
        x: e.clientX / W - 0.5, 
        y: e.clientY / H - 0.5,
        px: e.clientX,
        py: e.clientY
      };
    };
    window.addEventListener('mousemove', trackMouse);

    // === 1. GENERATE SCREEN CRACKS ===
    const generateCracks = () => {
      let segments = [];
      const cx = W * 0.4 + Math.random() * W * 0.2;
      const cy = H * 0.4 + Math.random() * H * 0.2;
      
      const branch = (x, y, angle, length, depth) => {
        if (depth === 0 || length < 5) return;
        const x2 = x + Math.cos(angle) * length;
        const y2 = y + Math.sin(angle) * length;
        segments.push({x1: x, y1: y, x2: x2, y2: y2});
        
        const numBranches = Math.floor(Math.random() * 3) + 1;
        for(let i = 0; i < numBranches; i++) {
          branch(x2, y2, angle + (Math.random() - 0.5) * 1.8, length * (0.4 + Math.random() * 0.4), depth - 1);
        }
      };
      
      const mainBranches = 5 + Math.floor(Math.random() * 4);
      for(let i = 0; i < mainBranches; i++) {
        branch(cx, cy, (i / mainBranches) * Math.PI * 2 + Math.random(), W * 0.2 + Math.random() * W * 0.2, 6);
      }
      return { segments, cx, cy };
    };
    let cracks = generateCracks();
    let crackProgress = 0; // Animates from 0 to 1 during load time

    // === 2. BSOD SYSTEM ===
    const spawnBsod = () => ({
      x: Math.random() * (W - 300), y: Math.random() * (H - 200),
      w: 280 + Math.random() * 120, h: 160 + Math.random() * 80,
      life: 0, maxLife: 40 + Math.random() * 80,
      text: [
        "*** STOP: 0x000000FF",
        "SYSTEM_CORRUPTION_DETECTED",
        "A fatal exception 0E has occurred",
        "at 0028:C0011E36 in VXD VMM(01).",
        "The current application will be",
        "terminated.",
        "",
        "* Press any key to terminate",
        "* Press CTRL+ALT+DEL again"
      ]
    });
    let bsods = [];

    // === 3. DATA CRAWLERS (Content Eaters) ===
    let crawlers = Array.from({ length: 3 }, () => ({
      x: Math.random() > 0.5 ? -100 : window.innerWidth + 100,
      y: Math.random() * window.innerHeight,
      vx: 0, vy: 0,
      state: 'searching', // searching, moving, feeding, exploding, dead
      target: null,
      feedProgress: 0,
      particles: [],
      explodeTimer: 0,
      respawnTimer: 0
    }));

    // === SCROLL LISTENER (Natively shifts the canvas and crawlers) ===
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (delta !== 0 && W > 0 && H > 0) {
        // Shift corruption canvas pixels so bites stay perfectly stuck on text
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = W; tempCanvas.height = H;
        tempCanvas.getContext('2d').drawImage(corrCanvas, 0, 0);
        corrCtx.clearRect(0, 0, W, H);
        corrCtx.drawImage(tempCanvas, 0, -delta);

        // Shift all crawlers and their targets vertically
        crawlers.forEach(c => {
          c.y -= delta;
          if (c.target) c.target.y -= delta;
          c.particles.forEach(p => p.y -= delta);
        });
      }
    };
    window.addEventListener('scroll', handleScroll);

    const handleClick = (e) => {
      crawlers.forEach(c => {
        if (c.state !== 'dead' && c.state !== 'exploding') {
          const dist = Math.hypot(e.clientX - c.x, e.clientY - c.y);
          if (dist < 60) { // Hitbox to kill crawler
            c.state = 'exploding';
            c.explodeTimer = 0;
            for(let i = 0; i < 40; i++) {
              c.particles.push({
                x: c.x, y: c.y,
                vx: (Math.random() - 0.5) * 20, vy: (Math.random() - 0.5) * 20,
                life: 0, maxLife: 15 + Math.random() * 25
              });
            }
          }
        }
      });
    };
    window.addEventListener('mousedown', handleClick);

    let frameCount = 0;
    const draw = () => {
      bgCtx.fillStyle = 'rgba(6,6,8,0.7)';
      bgCtx.fillRect(0, 0, W, H);
      
      // Clear mouse canvas entirely (Mice are drawn on top of everything)
      mCtx.clearRect(0, 0, W, H);
      
      frameCount++;

      // --- CRACK ANIMATION PROGRESS ---
      if (crackProgress < 1.0) crackProgress += 0.006; // grows over first 2.5 seconds

      // --- GET TARGETS (Every 60 frames) ---
      let availableTargets = [];
      if (frameCount % 60 === 0) {
        // Find visible content elements (text, cards, buttons)
        const els = Array.from(document.querySelectorAll('h1, h2, h3, p, a, .cc-value, span, li, .card'));
        els.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.width > 10 && rect.height > 10 && rect.top > 50 && rect.bottom < H - 50) {
            availableTargets.push(rect);
          }
        });
      }

      // --- DRAW CRACKS ---
      const maxCrackDist = Math.max(W, H) * 0.8;
      cracks.segments.forEach(seg => {
        // Animate cracks growing outward from center
        const dist = Math.hypot(seg.x1 - cracks.cx, seg.y1 - cracks.cy);
        if (dist > maxCrackDist * crackProgress) return; // not drawn yet

        bgCtx.beginPath();
        bgCtx.moveTo(seg.x1, seg.y1);
        bgCtx.lineTo(seg.x2, seg.y2);
        if (Math.random() > 0.97) {
          bgCtx.strokeStyle = Math.random() > 0.5 ? '#FF00FF' : '#00FFFF';
          bgCtx.lineWidth = 1.5 + Math.random() * 2;
          bgCtx.shadowBlur = 10;
          bgCtx.shadowColor = bgCtx.strokeStyle;
        } else {
          bgCtx.strokeStyle = 'rgba(0,0,0,0.9)';
          bgCtx.lineWidth = 1;
          bgCtx.shadowBlur = 0;
        }
        bgCtx.stroke();
      });
      bgCtx.shadowBlur = 0;

      // --- DRAW BSODs ---
      if (Math.random() > 0.98 && bsods.length < 3) bsods.push(spawnBsod());
      for (let i = bsods.length - 1; i >= 0; i--) {
        let b = bsods[i];
        b.life++;
        if (b.life > b.maxLife) { bsods.splice(i, 1); continue; }
        
        const shiftX = Math.random() > 0.9 ? (Math.random() - 0.5) * 20 : 0;
        const opacity = Math.random() > 0.95 ? 0.4 : 0.85;
        
        bgCtx.fillStyle = `rgba(0, 0, 170, ${opacity})`;
        bgCtx.fillRect(b.x + shiftX, b.y, b.w, b.h);
        
        bgCtx.fillStyle = '#FFFFFF';
        bgCtx.font = '11px "Share Tech Mono", monospace';
        b.text.forEach((txt, idx) => {
          if (Math.random() > 0.95) txt = txt.split('').sort(()=>Math.random()-0.5).join('');
          bgCtx.fillText(txt, b.x + 15 + shiftX, b.y + 25 + idx * 16);
        });
      }

      // --- DRAW CRAWLERS ---
      crawlers.forEach(c => {
        // Only spawn crawlers after cracks reach 20%
        if (crackProgress < 0.2) return;

        if (c.state === 'searching') {
          if (availableTargets.length > 0) {
            // Pick a random spot inside a random target element
            const rect = availableTargets[Math.floor(Math.random() * availableTargets.length)];
            c.target = {
              x: rect.left + Math.random() * rect.width,
              y: rect.top + Math.random() * rect.height
            };
            c.state = 'moving';
          } else {
            // Idle wander if no targets found
            c.x += (Math.random() - 0.5) * 2;
            c.y += (Math.random() - 0.5) * 2;
            c.vx = c.x > W/2 ? -1 : 1; // Fake velocity for facing direction
          }
        } 
        else if (c.state === 'moving') {
          const dx = c.target.x - c.x;
          const dy = c.target.y - c.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 4) {
            c.state = 'feeding';
            c.feedProgress = 0;
          } else {
            // Move slowly towards target with slight cyberpunk jitter
            const speed = 2.5 + Math.random() * 2.5;
            c.vx = (dx / dist) * speed;
            c.vy = (dy / dist) * speed;
            c.x += c.vx;
            c.y += c.vy;
          }

          // Glitch ghost occasionally on background canvas
          if (Math.random() > 0.6) {
            bgCtx.save();
            bgCtx.translate(c.x, c.y);
            if (c.vx < 0) bgCtx.scale(-1, 1);
            bgCtx.fillStyle = Math.random() > 0.5 ? '#FF00FF' : '#00FFFF';
            bgCtx.globalAlpha = 0.5;
            bgCtx.beginPath();
            bgCtx.ellipse((Math.random()-0.5)*10, (Math.random()-0.5)*10, 10, 7, 0, 0, Math.PI*2);
            bgCtx.fill();
            bgCtx.restore();
          }
        } 
        else if (c.state === 'feeding') {
          // Normal/Fast feeding animation
          c.feedProgress += 0.8; 
          
          // Draw the growing bite mark on corruption canvas (Inverts the DOM!)
          corrCtx.fillStyle = '#FFFFFF'; 
          
          // Expanding jagged glitch block
          const size = c.feedProgress;
          corrCtx.fillRect(
            c.x - size/2 + (Math.random()-0.5)*size*0.5,
            c.y - size/2 + (Math.random()-0.5)*size*0.5,
            8 + Math.random() * size,
            8 + Math.random() * size
          );

          // Stop feeding ONLY when fully corrupted this spot
          if (c.feedProgress > 45) {
            c.state = 'searching';
            c.target = null; // Clear target to force a new one
          }
        }

        // --- FOREGROUND DRAWING (Always visible) ---
        if (c.state === 'searching' || c.state === 'moving' || c.state === 'feeding') {
          drawAnimeMouse(mCtx, c.x, c.y, frameCount, c.state, c.vx, c.target);
        }
        else if (c.state === 'exploding') {
          // Dramatic Cyberpunk boom on mCtx (Foreground)
          c.explodeTimer++;
          
          // Expanding Shockwave Ring
          mCtx.beginPath();
          mCtx.arc(c.x, c.y, c.explodeTimer * 3, 0, Math.PI * 2);
          mCtx.strokeStyle = `rgba(255, 0, 0, ${1 - c.explodeTimer / 40})`;
          mCtx.lineWidth = 2;
          mCtx.stroke();

          // Error Text Pop-up
          mCtx.fillStyle = `rgba(255, 0, 0, ${1 - c.explodeTimer / 40})`;
          mCtx.font = 'bold 16px "Share Tech Mono", monospace';
          mCtx.fillText("[ERR_TERMINATED]", c.x - 60, c.y - 15 - c.explodeTimer);

          // Violent Particle Burst
          c.particles.forEach(p => {
            p.x += p.vx; p.y += p.vy; p.life++;
            mCtx.fillStyle = Math.random() > 0.5 ? '#FF0000' : '#FFFF00';
            const pSize = Math.max(0, 8 - (p.life / p.maxLife) * 8);
            mCtx.fillRect(p.x, p.y, pSize, pSize);
          });

          if (c.explodeTimer > 40) {
            c.state = 'dead';
            c.respawnTimer = 60 * 20 + Math.random() * 60 * 20; // Wait 20 to 40 seconds to respawn!
          }
        }
      });
      
      // Reseed dead crawlers from off-screen edges after fixed time
      crawlers.forEach(c => {
        if (c.state === 'dead') {
          c.respawnTimer--;
          if (c.respawnTimer <= 0) {
            c.x = Math.random() > 0.5 ? -100 : W + 100;
            c.y = Math.random() * H;
            c.vx = 0; c.vy = 0;
            c.state = 'searching';
            c.target = null;
            c.feedProgress = 0;
            c.particles = [];
            c.explodeTimer = 0;
          }
        }
      });

      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', trackMouse);
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <canvas id="bg-canvas" ref={bgRef} />
      <canvas id="corruption-canvas" ref={corrRef} />
      <canvas id="mouse-canvas" ref={mouseCanvasRef} />
    </>
  );
};

/* ── FLOATING WIREFRAME SHAPES ─────────────────────────────────────── */
const floatingShapes = [
  { id: 0, size: 160, x: '8%',   y: '15%', dur: 16, shape: 'hex' },
  { id: 1, size: 100, x: '83%',  y: '10%', dur: 20, shape: 'tri' },
  { id: 2, size: 80,  x: '72%',  y: '55%', dur: 13, shape: 'hex' },
  { id: 3, size: 130, x: '3%',   y: '65%', dur: 22, shape: 'tri' },
  { id: 4, size: 70,  x: '48%',  y: '82%', dur: 17, shape: 'hex' },
  { id: 5, size: 110, x: '90%',  y: '75%', dur: 12, shape: 'tri' },
  { id: 6, size: 50,  x: '25%',  y: '88%', dur: 19, shape: 'hex' },
  { id: 7, size: 90,  x: '60%',  y: '5%',  dur: 15, shape: 'tri' },
  { id: 8, size: 140, x: '55%',  y: '45%', dur: 25, shape: 'hex' },
];

export const FloatingShapes = () => (
  <div id="floating-shapes">
    {floatingShapes.map(s => (
      <motion.svg
        key={s.id}
        width={s.size}
        height={s.size}
        style={{ position: 'fixed', left: s.x, top: s.y, pointerEvents: 'none', zIndex: 1, opacity: 0.12 }}
        animate={{
          y: [0, -30, 0],
          rotate: [0, 360],
          opacity: [0.08, 0.18, 0.08],
        }}
        transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut' }}
      >
        {s.shape === 'hex' ? (
          <polygon
            points={`${s.size/2},4 ${s.size-4},${s.size*0.25} ${s.size-4},${s.size*0.75} ${s.size/2},${s.size-4} 4,${s.size*0.75} 4,${s.size*0.25}`}
            fill="none"
            stroke="#FF00FF"
            strokeWidth="1.5"
          />
        ) : (
          <polygon
            points={`${s.size/2},4 ${s.size-4},${s.size-4} 4,${s.size-4}`}
            fill="none"
            stroke="#00FFFF"
            strokeWidth="1.5"
          />
        )}
      </motion.svg>
    ))}
  </div>
);

/* ── RANDOMIZED GLITCH FLASH ───────────────────────────────────────── */
export const RandomGlitch = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setActive(true);
      const duration = Math.random() * 200 + 100;
      setTimeout(() => setActive(false), duration);
      setTimeout(trigger, Math.random() * 8000 + 4000);
    };
    const t = setTimeout(trigger, 3000);
    return () => clearTimeout(t);
  }, []);

  if (!active) return null;
  return (
    <>
      <div className="glitch-flash layer-mg" />
      <div className="glitch-flash layer-cy" style={{ animationDelay: '0.05s' }} />
    </>
  );
};

/* ── NAVBAR ────────────────────────────────────────────────────────── */
export const Navbar = () => {
  const [activeId, setActiveId] = useState('');
  const [scrolled,  setScrolled]  = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const ids = ['about','education','experience','projects','skills','certifications','coding','contact'];
      let cur = '';
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) cur = id;
      });
      setActiveId(cur);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['about', 'About'], ['education', 'Edu'], ['experience', 'Exp'],
    ['projects', 'Projects'], ['skills', 'Skills'],
    ['certifications', 'Certs'], ['coding', 'Coding'], ['contact', 'Contact'],
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={scrolled ? 'scrolled' : ''}
    >
      <img src="/logo.png" alt="NAK" className="nav-logo-img" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      <ul className="nav-links">
        {links.map(([id, label]) => (
          <li key={id}>
            <a href={`#${id}`} className={activeId === id ? 'active' : ''}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

/* ── FOOTER ────────────────────────────────────────────────────────── */
export const Footer = ({ name }) => (
  <footer>
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <span>// </span>{name} <span>·</span> PORTFOLIO_v2.0 <span>·</span> BUILT WITH CONTROLLED CHAOS
    </motion.div>
  </footer>
);
