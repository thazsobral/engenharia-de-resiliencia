import React, { useState } from 'react';
import { Header } from './components/Header';
import { AmirKlinkBoatSimulator } from './components/AmirKlinkBoatSimulator';
import { ChaosEngineeringSimulator } from './components/ChaosEngineeringSimulator';
import { ComparisonAndQuiz } from './components/ComparisonAndQuiz';
import { GlossaryModal } from './components/GlossaryModal';
import { Footer } from './components/Footer';
import { soundFx } from './utils/audio';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);

  const handleToggleSound = () => {
    soundFx.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  const handleStartJourney = () => {
    const el = document.getElementById('modulo-1');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-sky-600 selection:text-white">
      {/* Header & Hero Section */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onStartJourney={handleStartJourney}
      />

      <main>
        {/* Module 1: Amir Klink & The Self-Righting Boat */}
        <AmirKlinkBoatSimulator />

        {/* Module 2: Chaos Engineering & Cloud Resiliency */}
        <ChaosEngineeringSimulator />

        {/* Module 3: Comparative Summary & Interactive Quiz */}
        <ComparisonAndQuiz />
      </main>

      {/* Footer */}
      <Footer />

      {/* Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </div>
  );
}
