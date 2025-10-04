import React from 'react';
import LandingHero from '../components/LandingHero';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <LandingHero />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Landing;
