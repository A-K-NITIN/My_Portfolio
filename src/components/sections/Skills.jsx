import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { StaggerContainer, StaggerItem, SectionHead } from '../utils';

// Converts 0-100 to hex-style readout
const toHex = (n) => n.toString(16).toUpperCase().padStart(2, '0');

export const Skills = ({ D }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <section className="sec" id="skills" ref={ref}>
      <SectionHead num="05" label="// CAPABILITIES_LOADED" title="SKILLS" />
      <StaggerContainer className="skills-grid" delayStart={0.2}>
        {D.skillGroups.map((g, i) => (
          <StaggerItem key={i}>
            <div className="skill-block">
              {/* Terminal-style block header */}
              <div className="sb-head">
                <span className="sb-prefix">SYS://</span>{g.group}
              </div>
              {g.skills.map((s, j) => (
                <div className="skill-row" key={j}>
                  <div className="skill-info">
                    <span className="skill-name">
                      <span className="skill-bullet">▶</span> {s.name}
                    </span>
                    <span className="skill-readout">
                      <span className="skill-hex">0x{toHex(s.pct)}</span>
                      <span className="skill-pct">{s.pct}%</span>
                    </span>
                  </div>
                  <div className="skill-track">
                    {/* Segmented bar — like a loading progress display */}
                    {Array.from({ length: 20 }, (_, k) => {
                      const threshold = (k + 1) * 5; // each segment = 5%
                      return (
                        <motion.div
                          key={k}
                          className="skill-seg"
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={isInView
                            ? { opacity: s.pct >= threshold ? 1 : 0.08, scaleY: 1 }
                            : { opacity: 0, scaleY: 0 }
                          }
                          transition={{
                            duration: 0.15,
                            delay: 0.4 + j * 0.06 + k * 0.04,
                            ease: 'easeOut',
                          }}
                          style={{
                            background: s.pct >= threshold
                              ? k < 14
                                ? 'var(--mg)'
                                : 'var(--cy)'   // last segments turn cyan
                              : 'rgba(255,255,255,0.05)',
                            boxShadow: s.pct >= threshold
                              ? k < 14
                                ? '0 0 6px var(--mg)'
                                : '0 0 6px var(--cy)'
                              : 'none',
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
};
