import React from 'react';
import LandingHero from '../components/LandingHero';
import AboutSection from '../components/AboutSection';

const Landing: React.FC = () => {
  return (
    <div>
      <LandingHero />
      <AboutSection />
      <footer className="bg-base-200 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-base-content/60">© 2025 FocusMate</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
