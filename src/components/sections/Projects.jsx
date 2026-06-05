import { StaggerContainer, StaggerItem, TiltCard, SectionHead } from '../utils';

export const Projects = ({ D }) => (
  <section className="sec" id="projects">
    <SectionHead num="04" label="// OPERATIONS_EXECUTED" title="PROJECTS" />
    <StaggerContainer className="proj-grid" delayStart={0.2}>
      {D.projects.map((p, i) => (
        <StaggerItem key={i}>
          <TiltCard className="proj-card">
            <div className="proj-card-inner">
              <div className="proj-yr">[{p.yr}]</div>
              <div className="proj-name">{p.name}</div>
              <div className="proj-desc">{p.desc}</div>
              <div className="proj-tags">
                {p.tags.map((t, j) => <span key={j} className="ptag">{t}</span>)}
              </div>
              {/* Add a link prop in data.js to make the arrow clickable */}
              {p.link && p.link !== '#' && (
                <a href={p.link} target="_blank" rel="noreferrer" className="proj-arrow">→</a>
              )}
              {(!p.link || p.link === '#') && <div className="proj-arrow">→</div>}
            </div>
          </TiltCard>
        </StaggerItem>
      ))}
    </StaggerContainer>
  </section>
);
