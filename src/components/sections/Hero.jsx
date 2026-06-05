import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Hero = ({ D }) => {
  const [roleText, setRoleText] = useState('');

  useEffect(() => {
    let ri = 0;
    const type = () => {
      if (ri <= D.tagline.length) {
        setRoleText(D.tagline.slice(0, ri) + (ri < D.tagline.length ? '█' : ''));
        ri++;
        setTimeout(type, 55);
      }
    };
    setTimeout(type, 1600);
  }, [D.tagline]);

  return (
    <section id="hero">
      {/* Pre-text */}
      <motion.div className="hero-sys"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}>
        {D.heroPre}
      </motion.div>

      {/* Name with glitch ghosts */}
      <div className="hero-name-wrap">
        <motion.span className="hero-name"
          initial={{ opacity: 0, x: -60, skewX: -6 }}
          animate={{ opacity: 1,  x: 0,   skewX: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          {D.name}
        </motion.span>
        <span className="hero-name-ghost ghost-m" aria-hidden="true">{D.name}</span>
        <span className="hero-name-ghost ghost-c" aria-hidden="true">{D.name}</span>
      </div>

      {/* Typewriter role */}
      <motion.div className="hero-role"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}>
        {roleText}
      </motion.div>

      {/* Bio */}
      <motion.div className="hero-bio"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}>
        {D.bio}
      </motion.div>

      {/* Buttons with magnetic effect */}
      <motion.div className="hero-btns"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}>
        <MagneticBtn href="#projects" className="btn btn-mg">▶ VIEW PROJECTS</MagneticBtn>
        <MagneticBtn href={`mailto:${D.email}`} className="btn btn-cy">⇩ CONTACT ME</MagneticBtn>
      </motion.div>

      {/* Side stats */}
      <motion.div className="hero-stats"
        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}>
        {D.heroStats.map((s, i) => (
          <motion.div className="h-stat" key={i}
            whileHover={{ scale: 1.1, x: -8 }}>
            <div className="h-stat-val">{s.val}</div>
            <div className="h-stat-lbl">{s.lbl}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <motion.div className="hero-scroll-cue"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2 }}>
        <div className="scroll-line" />
        <span>SCROLL DOWN</span>
      </motion.div>
    </section>
  );
};

/* Magnetic button — subtly pulls toward cursor */
const MagneticBtn = ({ href, className, children }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left - rect.width  / 2) * 0.35,
      y: (e.clientY - rect.top  - rect.height / 2) * 0.35,
    });
  };
  return (
    <motion.a
      href={href}
      className={className}
      animate={{ x: pos.x, y: pos.y }}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.a>
  );
};
