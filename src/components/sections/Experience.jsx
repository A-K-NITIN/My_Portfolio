import { FadeUp, TiltCard, SectionHead } from '../utils';

export const Experience = ({ D }) => {
  const ex = D.experience;
  return (
    <section className="sec" id="experience">
      <SectionHead num="03" label="// MISSION_LOG" title="EXPERIENCE" />
      <FadeUp delay={0.2}>
        <TiltCard className="exp-card">
          <div className="exp-badge">{ex.badge}</div>
          <div className="exp-title">{ex.title}</div>
          <div className="exp-company">{ex.company}</div>
          <div className="exp-period">{ex.period}</div>
          <ul className="exp-pts">
            {ex.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </TiltCard>
      </FadeUp>
    </section>
  );
};
