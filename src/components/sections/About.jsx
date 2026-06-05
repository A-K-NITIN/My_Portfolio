import { FadeUp, StaggerContainer, StaggerItem, TiltCard, SectionHead } from '../utils';

export const About = ({ D }) => (
  <section className="sec" id="about">
    <SectionHead num="01" label="// ABOUT.EXE" title="ABOUT ME" />
    <div className="about-layout">
      <FadeUp delay={0.15} direction="left">
        <p className="about-p">Hey — I'm <em>{D.name}</em>, an <strong>AI/ML Engineering student</strong> who writes code that actually runs, builds things that actually work, and breaks things to understand them better.</p>
        <p className="about-p">My stack ranges from low-level <em>C/C++</em> systems to full-stack <strong>MERN applications</strong> to data science with <em>Python</em>. I believe in learning by doing — which is why my LeetCode count keeps climbing.</p>
        <p className="about-p">Currently in my first year at <strong>Sri Eshwar College</strong>, already shipping real projects and completing real internships. That's the glitch art philosophy — <em>controlled chaos producing beautiful results.</em></p>
      </FadeUp>
      <StaggerContainer className="stat-wall" delayStart={0.3}>
        {D.aboutStats.map((s, i) => (
          <StaggerItem key={i}>
            <TiltCard className="sw">
              <div className="sw-val">{s.val}</div>
              <div className="sw-lbl">{s.lbl}</div>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);
