import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TiltCard } from './Core';

const FadeUp = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Hero = ({ D }) => {
  const [roleText, setRoleText] = useState('');
  
  React.useEffect(() => {
    let ri = 0;
    const typeRole = () => {
      if (ri <= D.tagline.length) {
        setRoleText(D.tagline.slice(0, ri) + (ri < D.tagline.length ? '█' : ''));
        ri++;
        setTimeout(typeRole, 55);
      }
    };
    setTimeout(typeRole, 1400);
  }, [D.tagline]);

  return (
    <section id="hero">
      <motion.div 
        className="hero-sys"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {D.heroPre}
      </motion.div>
      
      <div className="hero-name-wrap">
        <motion.span 
          className="hero-name"
          initial={{ opacity: 0, x: -40, skewX: -4 }}
          animate={{ opacity: 1, x: 0, skewX: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {D.name}
        </motion.span>
        <span className="hero-name-ghost ghost-m" aria-hidden="true">{D.name}</span>
        <span className="hero-name-ghost ghost-c" aria-hidden="true">{D.name}</span>
      </div>
      
      <motion.div 
        className="hero-role"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        {roleText}
      </motion.div>
      
      <motion.div 
        className="hero-bio"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        {D.bio}
      </motion.div>
      
      <motion.div 
        className="hero-btns"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <a href="#projects" className="btn btn-mg">▶ VIEW PROJECTS</a>
        <a href={`mailto:${D.email}`} className="btn btn-cy">⇩ CONTACT ME</a>
      </motion.div>
      
      <motion.div 
        className="hero-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
      >
        {D.heroStats.map((s, i) => (
          <div className="h-stat" key={i}>
            <div className="h-stat-val">{s.val}</div>
            <div className="h-stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </motion.div>
      
      <motion.div 
        className="hero-scroll-cue"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <div className="scroll-line"></div><span>SCROLL DOWN</span>
      </motion.div>
    </section>
  );
};

export const About = ({ D }) => (
  <section className="sec" id="about">
    <div className="sec-num">01</div>
    <FadeUp className="sec-head">
      <div className="sec-label">// ABOUT.EXE</div>
      <div className="sec-title">ABOUT ME</div>
    </FadeUp>
    <div className="about-layout">
      <FadeUp delay={0.2}>
        <p className="about-p">Hey — I'm <em>{D.name}</em>, an <strong>AI/ML Engineering student</strong> who writes code that actually runs, builds things that actually work, and breaks things to understand them better.</p>
        <p className="about-p">My stack ranges from low-level <em>C/C++</em> systems to full-stack <strong>MERN applications</strong> to data science with <em>Python</em>. I believe in learning by doing — which is why my LeetCode count keeps climbing.</p>
        <p className="about-p">Currently in my first year at <strong>Sri Eshwar College</strong>, already shipping real projects and completing real internships. That's the glitch art philosophy — <em>controlled chaos producing beautiful results.</em></p>
      </FadeUp>
      <FadeUp delay={0.4} className="stat-wall">
        {D.aboutStats.map((s, i) => (
          <TiltCard key={i} className="sw">
            <div className="sw-val">{s.val}</div>
            <div className="sw-lbl">{s.lbl}</div>
          </TiltCard>
        ))}
      </FadeUp>
    </div>
  </section>
);

export const Education = ({ D }) => (
  <section className="sec" id="education">
    <div className="sec-num">02</div>
    <FadeUp className="sec-head">
      <div className="sec-label">// KNOWLEDGE_LOADED</div>
      <div className="sec-title">EDUCATION</div>
    </FadeUp>
    <div className="edu-list">
      {D.education.map((e, i) => (
        <FadeUp key={i} delay={i * 0.1}>
          <div className="edu-card">
            <div>
              <div className="edu-deg">{e.deg}</div>
              <div className="edu-sch">{e.school}</div>
            </div>
            <div className="edu-right">
              <div className="edu-score">{e.score}</div>
              <div className="edu-yr">{e.yr}</div>
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  </section>
);

export const Experience = ({ D }) => (
  <section className="sec" id="experience">
    <div className="sec-num">03</div>
    <FadeUp className="sec-head">
      <div className="sec-label">// MISSION_LOG</div>
      <div className="sec-title">EXPERIENCE</div>
    </FadeUp>
    <FadeUp delay={0.2}>
      <TiltCard className="exp-card">
        <div className="exp-badge">{D.experience.badge}</div>
        <div className="exp-title">{D.experience.title}</div>
        <div className="exp-company">{D.experience.company}</div>
        <div className="exp-period">{D.experience.period}</div>
        <ul className="exp-pts">
          {D.experience.points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </TiltCard>
    </FadeUp>
  </section>
);

export const Projects = ({ D }) => (
  <section className="sec" id="projects">
    <div className="sec-num">04</div>
    <FadeUp className="sec-head">
      <div className="sec-label">// OPERATIONS_EXECUTED</div>
      <div className="sec-title">PROJECTS</div>
    </FadeUp>
    <div className="proj-grid">
      {D.projects.map((p, i) => (
        <FadeUp key={i} delay={i * 0.1}>
          <TiltCard className="proj-card">
            <div className="proj-card-inner">
              <div className="proj-yr">[{p.yr}]</div>
              <div className="proj-name">{p.name}</div>
              <div className="proj-desc">{p.desc}</div>
              <div className="proj-tags">
                {p.tags.map((t, j) => <span key={j} className="ptag">{t}</span>)}
              </div>
              <div className="proj-arrow">→</div>
            </div>
          </TiltCard>
        </FadeUp>
      ))}
    </div>
  </section>
);

export const Skills = ({ D }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <section className="sec" id="skills" ref={ref}>
      <div className="sec-num">05</div>
      <FadeUp className="sec-head">
        <div className="sec-label">// CAPABILITIES_LOADED</div>
        <div className="sec-title">SKILLS</div>
      </FadeUp>
      <div className="skills-grid">
        {D.skillGroups.map((g, i) => (
          <FadeUp key={i} delay={i * 0.1}>
            <div className="skill-block">
              <div className="sb-head">{g.group}</div>
              {g.skills.map((s, j) => (
                <div className="skill-row" key={j}>
                  <div className="skill-info">
                    <span>{s.name}</span>
                    <span className="skill-pct">{s.pct}%</span>
                  </div>
                  <div className="skill-track">
                    <motion.div 
                      className="skill-fill" 
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${s.pct}%` } : { width: 0 }}
                      transition={{ duration: 1.4, delay: 0.5 + (j * 0.1), ease: [0.4, 0, 0.2, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
};

export const Certifications = ({ D }) => (
  <section className="sec" id="certifications">
    <div className="sec-num">06</div>
    <FadeUp className="sec-head">
      <div className="sec-label">// ACHIEVEMENTS_UNLOCKED</div>
      <div className="sec-title">CERTIFICATIONS</div>
    </FadeUp>
    <div className="cert-grid">
      {D.certs.map((c, i) => (
        <FadeUp key={i} delay={i * 0.05}>
          <TiltCard className="cert-card">
            <div className="cert-name">{c.name}</div>
            <div className="cert-plat">{c.plat}</div>
            <div className="cert-yr">{c.yr}</div>
          </TiltCard>
        </FadeUp>
      ))}
    </div>
  </section>
);

export const CodingProfile = ({ D }) => (
  <section className="sec" id="coding">
    <div className="sec-num">07</div>
    <FadeUp className="sec-head">
      <div className="sec-label">// LEADERBOARD</div>
      <div className="sec-title">CODING PROFILE</div>
    </FadeUp>
    <div className="cp-grid">
      {D.codingProfiles.map((c, i) => (
        <FadeUp key={i} delay={i * 0.1}>
          <TiltCard className="cp-card-wrapper" style={{ display: 'block' }}>
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="cp-card">
              <div className="cp-plat">{c.plat}</div>
              <div className="cp-stat">{c.stat}</div>
              <div className="cp-visit">VISIT →</div>
            </a>
          </TiltCard>
        </FadeUp>
      ))}
    </div>
  </section>
);

export const Contact = ({ D }) => {
  const [terminalOutput, setTerminalOutput] = useState([
    { p: '$ ', c: 'whoami' },
    { o: `→ ${D.name}` },
    { p: '$ ', c: 'cat status.txt' },
    { o: '→ Open to internships & collaborations' },
    { p: '$ ', c: 'ls skills/ | head -6' },
    { o: '→ C  C++  Python  MERN  DSA  ML' },
    { p: '$ ', d: 'location: Tamil Nadu, India' },
  ]);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const handleTerminalClick = () => {
    if (isConnecting) return;
    setIsConnecting(true);
    setTerminalOutput(prev => [...prev, { p: '$ ', c: './connect.sh' }]);
    
    setTimeout(() => {
      setTerminalOutput(prev => [
        ...prev, 
        { o: `→ Initializing secure connection to ${D.name}...` },
        { d: '→ Please wait.' }
      ]);
    }, 400);
  };

  return (
    <section className="sec" id="contact">
      <div className="sec-num">08</div>
      <FadeUp className="sec-head">
        <div className="sec-label">// OPEN_CHANNEL</div>
        <div className="sec-title">CONTACT</div>
      </FadeUp>
      <div className="contact-layout">
        <FadeUp delay={0.2}>
          <div className="contact-p">
            Open to opportunities, collaborations, and interesting problems to solve. 
            Whether it's a project, internship, or just a conversation about code — reach out.
          </div>
          <div className="clinks">
            <a className="clink" href={`mailto:${D.email}`}><div className="clink-icon">@</div>{D.email}</a>
            <a className="clink" href={`tel:${D.phone}`}><div className="clink-icon">#</div>{D.phone}</a>
            <a className="clink" href={D.github} target="_blank" rel="noreferrer"><div className="clink-icon">&#123;&#125;</div>GitHub</a>
            <a className="clink" href={D.linkedin} target="_blank" rel="noreferrer"><div className="clink-icon">in</div>LinkedIn</a>
          </div>
        </FadeUp>
        <FadeUp delay={0.4}>
          <div className="terminal" onClick={handleTerminalClick} style={{ cursor: 'pointer' }}>
            {terminalOutput.map((line, i) => (
              <div key={i}>
                {line.p && <span className="t-p">{line.p}</span>}
                {line.c && <span className="t-c">{line.c}</span>}
                {line.o && <div className="t-o">{line.o}</div>}
                {line.d && <div className="t-d">{line.d}</div>}
              </div>
            ))}
            <div>
              <span className="t-p">$ </span>
              <span className="t-c blink">█</span>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
