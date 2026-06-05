import { StaggerContainer, StaggerItem, SectionHead } from '../utils';
import { motion } from 'framer-motion';

export const Certifications = ({ D }) => (
  <section className="sec" id="certifications">
    <SectionHead num="06" label="// ACHIEVEMENTS_UNLOCKED" title="CERTIFICATIONS" />
    <StaggerContainer className="cert-grid" delayStart={0.15}>
      {D.certs.map((c, i) => (
        <StaggerItem key={i}>
          <CertCard cert={c} index={i} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  </section>
);

const CertCard = ({ cert, index }) => {
  // Deterministic "glitch ID" from index
  const glitchId = `CRT-${String(index + 1).padStart(3, '0')}`;

  return (
    <motion.div
      className="cert-card"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Scanline overlay inside card */}
      <div className="cert-scanlines" />

      {/* Header row */}
      <div className="cert-header">
        <span className="cert-id">{glitchId}</span>
        <span className="cert-status">UNLOCKED</span>
      </div>

      {/* Name — main content */}
      <div className="cert-name">{cert.name}</div>

      {/* Footer row */}
      <div className="cert-footer">
        <span className="cert-plat">◆ {cert.plat}</span>
        <span className="cert-yr">[{cert.yr}]</span>
      </div>

      {/* Corner decoration */}
      <div className="cert-corner tl" />
      <div className="cert-corner br" />
    </motion.div>
  );
};
