import { useState } from 'react';
import './index.css';
import { D } from './data';

// ── CORE COMPONENTS ─────────────────────────────────────────────────
import {
  Loader, CustomCursor, AmbientGlow,
  CanvasBackground, FloatingShapes,
  Navbar, Footer, RandomGlitch
} from './components/Core';

// ── SECTION COMPONENTS ──────────────────────────────────────────────
// Each section is its own isolated file — easy to add, edit, or remove!
import { Hero }         from './components/sections/Hero';
import { About }        from './components/sections/About';
import { Education }    from './components/sections/Education';
import { Experience }   from './components/sections/Experience';
import { Projects }     from './components/sections/Projects';
import { Skills }       from './components/sections/Skills';
import { Certifications } from './components/sections/Certifications';
import { CodingProfile }  from './components/sections/CodingProfile';
import { Contact }      from './components/sections/Contact';

const Divider = () => <div className="divider" />;

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Always rendered — cursor works even on loader */}
      <CustomCursor />
      <Loader onComplete={() => setLoaded(true)} />

      {loaded && (
        <>
          {/* Background layers */}
          <div id="scanlines" />
          <CanvasBackground />
          <AmbientGlow />
          <FloatingShapes />
          <RandomGlitch />

          {/* Navigation */}
          <Navbar />

          {/* ── SECTIONS ── Add or remove sections below ── */}
          <Hero         D={D} />
          <Divider />
          <About        D={D} />
          <Divider />
          <Education    D={D} />
          <Divider />
          <Experience   D={D} />
          <Divider />
          <Projects     D={D} />
          <Divider />
          <Skills       D={D} />
          <Divider />
          <Certifications D={D} />
          <Divider />
          <CodingProfile D={D} />
          <Divider />
          <Contact      D={D} />

          <Footer name={D.name} />
        </>
      )}
    </>
  );
}

export default App;
