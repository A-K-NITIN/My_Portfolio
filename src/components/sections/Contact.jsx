import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FadeUp, SectionHead } from '../utils';

/* ── Oscilloscope Signal Canvas ─────────────────── */
const SignalCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rafId, time = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      time += 0.025;

      // Draw multiple overlapping chaotic waveforms
      const waves = [
        { freq: 2.1, amp: 0.32, phase: 0,        color: '255,0,255',   lw: 1.5, chaos: 0.6 },
        { freq: 3.7, amp: 0.18, phase: 1.2,       color: '0,255,255',   lw: 1,   chaos: 1.0 },
        { freq: 1.3, amp: 0.22, phase: 2.5,       color: '255,0,255',   lw: 0.5, chaos: 0.3 },
        { freq: 5.2, amp: 0.10, phase: time * 0.8, color: '255,255,255', lw: 0.4, chaos: 1.5 },
      ];

      waves.forEach(w => {
        ctx.beginPath();
        for (let x = 0; x <= W; x += 2) {
          const t    = (x / W) * Math.PI * 2 * w.freq + time + w.phase;
          // Stack multiple harmonics for chaos
          const y = H / 2
            + Math.sin(t) * H * w.amp
            + Math.sin(t * 2.3 + time * 0.7) * H * w.amp * 0.3 * w.chaos
            + Math.sin(t * 0.5 - time * 1.1) * H * w.amp * 0.2 * w.chaos
            + (Math.random() - 0.5) * 3 * w.chaos; // noise jitter

          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${w.color},0.6)`;
        ctx.lineWidth   = w.lw;
        ctx.shadowColor = `rgba(${w.color},0.8)`;
        ctx.shadowBlur  = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // Occasional random vertical spike (glitch artifact)
      if (Math.random() > 0.88) {
        const sx = Math.random() * W;
        ctx.beginPath();
        ctx.moveTo(sx, 0);
        ctx.lineTo(sx + (Math.random() - 0.5) * 20, H);
        ctx.strokeStyle = `rgba(255,0,255,${0.1 + Math.random() * 0.2})`;
        ctx.lineWidth   = 0.5 + Math.random();
        ctx.stroke();
      }

      // Center reference line (dim)
      ctx.beginPath();
      ctx.moveTo(0, H / 2);
      ctx.lineTo(W, H / 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth   = 1;
      ctx.stroke();

      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="signal-canvas" />;
};

/* ── Glitch Text Component ─────────────────────── */
const GlitchText = ({ children, color = 'var(--mg)' }) => (
  <span className="glitch-txt" style={{ '--gc': color }}>
    <span aria-hidden="true" className="glitch-txt-l">{children}</span>
    {children}
    <span aria-hidden="true" className="glitch-txt-r">{children}</span>
  </span>
);

/* ── Contact Card ──────────────────────────────── */
const ContactCard = ({ icon, label, value, href, delay, isMg }) => (
  <motion.a
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel="noreferrer"
    className={`contact-card ${isMg ? 'cc-mg' : 'cc-cy'}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.03 }}
  >
    <div className="cc-scanlines" />
    <div className="cc-top">
      <span className="cc-icon">{icon}</span>
      <span className="cc-label">{label}</span>
    </div>
    <div className="cc-value">
      <GlitchText color={isMg ? 'var(--mg)' : 'var(--cy)'}>{value}</GlitchText>
    </div>
    <div className="cc-arrow">→</div>
    <div className={`cc-corner tl`} />
    <div className={`cc-corner br`} />
  </motion.a>
);

/* ── Main Contact Section ──────────────────────── */
export const Contact = ({ D }) => {
  const cards = [
    { icon: '✉',  label: 'EMAIL',    value: D.email,   href: `mailto:${D.email}`,   isMg: true  },
    { icon: '◈',  label: 'GITHUB',   value: 'GitHub',  href: D.github,              isMg: false },
    { icon: '◉',  label: 'LINKEDIN', value: 'LinkedIn',href: D.linkedin,            isMg: true  },
    { icon: '☏',  label: 'PHONE',    value: D.phone,   href: `tel:${D.phone}`,      isMg: false },
  ];

  return (
    <section className="sec" id="contact">
      <SectionHead num="08" label="// OPEN_CHANNEL" title="CONTACT" />

      {/* Signal Visualizer — full width at top */}
      <FadeUp delay={0.1}>
        <div className="signal-wrap">
          <div className="signal-label-left">SIGNAL ACTIVE</div>
          <div className="signal-label-right">OPEN TO CONNECT</div>
          <SignalCanvas />
          {/* Overlay message in center of canvas */}
          <div className="signal-center-msg">
            <motion.div
              className="scm-text"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              TRANSMISSION OPEN
            </motion.div>
            <motion.div
              className="scm-sub"
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              {D.tagline}
            </motion.div>
          </div>
        </div>
      </FadeUp>

      {/* Contact cards grid */}
      <div className="contact-cards-grid">
        {cards.map((c, i) => (
          <ContactCard key={i} {...c} delay={0.15 + i * 0.1} />
        ))}
      </div>

      {/* Resume Download Button */}
      <FadeUp delay={0.55}>
        <div className="resume-btn-wrap">
          <motion.a
            href={D.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="resume-btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="resume-btn-icon">⬇</span>
            <span>DOWNLOAD RESUME</span>
            <span className="resume-btn-tag">PDF</span>
          </motion.a>
          <p className="resume-btn-note">Opens in Google Drive · Always up to date</p>
        </div>
      </FadeUp>
    </section>
  );
};
