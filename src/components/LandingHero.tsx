import React from 'react';
import { motion } from 'framer-motion';
import GoogleButton from './GoogleButton';
import ParticleBackground from './ParticleBackground';

const LandingHero: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Particle network background */}
      <ParticleBackground />
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black/10" />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center text-white max-w-5xl mx-auto"
        >
          {/* Logo/Wordmark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-light tracking-wider text-white/90 animate-float">
              FocusMate
            </h2>
          </motion.div>
          
          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold tracking-tight drop-shadow-md text-white mb-8"
          >
            Organize your thoughts... instantly.
          </motion.h1>
          
          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-white/90 mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed"
            style={{
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}
          >
            FocusMate turns your messy thoughts into clear, actionable ideas — instantly.
          </motion.p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-16 md:mb-20"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl animate-glow" />
              <GoogleButton />
            </div>
          </motion.div>
          
          
          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: '0s' }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: '2s' }}
          />
        </motion.div>
      </div>
      
      {/* Scroll down button - mobile friendly */}
      <div className="absolute bottom-4 md:bottom-8 w-full flex justify-center z-20">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToAbout}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-2 md:px-6 md:py-3 text-white hover:bg-white/20 transition-all duration-300 group min-w-max"
          style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}
        >
        <div className="flex flex-col items-center space-y-1">
          <span className="text-xs md:text-sm font-medium hidden sm:block">What does FocusMate do?</span>
          <span className="text-xs font-medium sm:hidden">Learn more</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/80"
          >
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className="group-hover:text-white transition-colors duration-300 md:w-4 md:h-4"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
        </motion.button>
      </div>
    </div>
  );
};

export default LandingHero;
