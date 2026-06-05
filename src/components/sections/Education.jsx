import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { StaggerContainer, StaggerItem, SectionHead } from '../utils';

export const Education = ({ D }) => (
  <section className="sec" id="education">
    <SectionHead num="02" label="// KNOWLEDGE_LOADED" title="EDUCATION" />
    <StaggerContainer className="edu-list" delayStart={0.2}>
      {D.education.map((e, i) => (
        <StaggerItem key={i}>
          <EduCard entry={e} index={i} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  </section>
);

const EduCard = ({ entry, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });

  // Fake "scan ID" — makes it feel like a record being pulled
  const recordId = `REC-${String(index + 1).padStart(3, '0')}`;

  return (
    <motion.div
      ref={ref}
      className="edu-card"
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Internal card scanlines */}
      <div className="edu-scanlines" />

      {/* Top meta row */}
      <div className="edu-meta">
        <span className="edu-record-id">{recordId}</span>
        <div className="edu-scan-bar">
          {/* Animated scan line that sweeps across */}
          <motion.div
            className="edu-scan-line"
            initial={{ scaleX: 0, originX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
          />
        </div>
        <span className="edu-yr">[{entry.yr}]</span>
      </div>

      {/* Main content */}
      <div className="edu-body">
        <div>
          <div className="edu-prompt">
            <span className="edu-prompt-sym">$</span> cat records/{entry.deg.toLowerCase().replace(/\s/g, '_')}.txt
          </div>
          <div className="edu-deg">{entry.deg}</div>
          <div className="edu-sch">
            <span className="edu-sch-arrow">▶</span> {entry.school}
          </div>
        </div>

        {/* Score with glitch-style display */}
        <div className="edu-score-wrap">
          <div className="edu-score-label">SCORE</div>
          <div className="edu-score">{entry.score}</div>
          <motion.div
            className="edu-score-bar"
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{ duration: 1, delay: 0.6 + index * 0.1, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Corner brackets */}
      <div className="edu-corner tl" />
      <div className="edu-corner tr" />
      <div className="edu-corner bl" />
      <div className="edu-corner br" />
    </motion.div>
  );
};
