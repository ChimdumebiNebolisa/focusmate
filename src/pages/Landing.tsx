import React from 'react';
import { motion } from 'framer-motion';
import LandingHero from '../components/LandingHero';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';

const Landing: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Single animated gradient background */}
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 opacity-50 blur-3xl"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <LandingHero />
      </div>
      
      {/* White background sections */}
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Landing;
