import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

// ── REUSABLE FADE-UP ANIMATION WRAPPER ─────────────────────────────
// Wrap any element in <FadeUp> to make it animate in on scroll
// Props: delay (seconds), className (CSS class), direction ('up'|'left'|'right')
export const FadeUp = ({ children, delay = 0, className = '', direction = 'up' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  const variants = {
    up:    { hidden: { opacity: 0, y: 50 },  visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 60 },  visible: { opacity: 1, x: 0 } },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[direction] || variants.up}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

// ── STAGGER CONTAINER ───────────────────────────────────────────────
// Wrap a list in <StaggerContainer> and children in <StaggerItem> 
// for automatic staggered entrance animations
export const StaggerContainer = ({ children, className = '', delayStart = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: { transition: { staggerChildren: 0.1, delayChildren: delayStart } },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = '' }) => (
  <motion.div
    className={className}
    variants={{
      hidden:  { opacity: 0, y: 40, scale: 0.96 },
      visible: { opacity: 1, y: 0,  scale: 1 },
    }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

// ── SECTION HEADER ──────────────────────────────────────────────────
// Reusable section header with label and title
export const SectionHead = ({ num, label, title }) => (
  <>
    <div className="sec-num">{num}</div>
    <FadeUp className="sec-head">
      <div className="sec-label">{label}</div>
      <div className="sec-title">{title}</div>
    </FadeUp>
  </>
);

// ── 3D TILT CARD WRAPPER ────────────────────────────────────────────
// Wrap any card in <TiltCard> to give it 3D mouse-following tilt
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

export const TiltCard = ({ children, className = '', style = {} }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ zIndex: 10, scale: 1.03 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
