import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import DemoPreview from './components/DemoPreview';
import Impact from './components/Impact';
import FooterCTA from './components/FooterCTA';
import CitizenApp from './components/CitizenApp';

function App() {
  const [view, setView] = useState<'landing' | 'app'>('landing');

  const enterApp = () => {
    setView('app');
    window.scrollTo(0, 0);
  };

  const exitApp = () => {
    setView('landing');
    window.scrollTo(0, 0);
  };

  if (view === 'app') {
    return <CitizenApp onBack={exitApp} />;
  }

  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-white">
      <Navbar onEnterApp={enterApp} />
      <main>
        <Hero onEnterApp={enterApp} />
        <Features />
        <HowItWorks />
        <DemoPreview />
        <Impact />
      </main>
      <FooterCTA onEnterApp={enterApp} />
    </div>
  );
}

export default App;