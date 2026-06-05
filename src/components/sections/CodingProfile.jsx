import { StaggerContainer, StaggerItem, TiltCard, SectionHead } from '../utils';

export const CodingProfile = ({ D }) => (
  <section className="sec" id="coding">
    <SectionHead num="07" label="// LEADERBOARD" title="CODING PROFILE" />
    <StaggerContainer className="cp-grid" delayStart={0.2}>
      {D.codingProfiles.map((c, i) => (
        <StaggerItem key={i}>
          <TiltCard>
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="cp-card">
              <div className="cp-plat">{c.plat}</div>
              <div className="cp-stat">{c.stat}</div>
              <div className="cp-visit">VISIT →</div>
            </a>
          </TiltCard>
        </StaggerItem>
      ))}
    </StaggerContainer>
  </section>
);
