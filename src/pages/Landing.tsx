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
          className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 via-purple-500/30 to-pink-500/30"
          animate={{ 
            background: [
              "linear-gradient(45deg, rgba(79, 70, 229, 0.3) 0%, rgba(147, 51, 234, 0.3) 50%, rgba(236, 72, 153, 0.3) 100%)",
              "linear-gradient(45deg, rgba(236, 72, 153, 0.3) 0%, rgba(79, 70, 229, 0.3) 50%, rgba(147, 51, 234, 0.3) 100%)",
              "linear-gradient(45deg, rgba(147, 51, 234, 0.3) 0%, rgba(236, 72, 153, 0.3) 50%, rgba(79, 70, 229, 0.3) 100%)",
              "linear-gradient(45deg, rgba(79, 70, 229, 0.3) 0%, rgba(147, 51, 234, 0.3) 50%, rgba(236, 72, 153, 0.3) 100%)"
            ]
          }}
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
