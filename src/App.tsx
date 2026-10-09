import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { ImpactStrip } from './components/sections/ImpactStrip';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Awards } from './components/sections/Awards';
import { Credentials } from './components/sections/Credentials';
import { Skills } from './components/sections/Skills';
import { Contact } from './components/sections/Contact';
import { ResumeModal } from './components/ui/ResumeModal';

export const App: React.FC = () => {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <a href="#hero" className="skip-link">
        Skip to main dossier
      </a>

      <Header onOpenResume={() => setResumeOpen(true)} />

      <main id="main-content">
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <ImpactStrip />
        <About />
        <Experience />
        <Projects />
        <Awards />
        <Credentials />
        <Skills />
        <Contact />
      </main>

      <Footer />

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
};

export default App;
