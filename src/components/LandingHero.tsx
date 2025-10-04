import React from 'react';
import { motion } from 'framer-motion';
import GoogleButton from './GoogleButton';
import ParticleBackground from './ParticleBackground';

const LandingHero: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500" />
      
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
            className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-md text-white mb-8"
          >
            Organize your thoughts... instantly.
          </motion.h1>
          
          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl lg:text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed"
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
    </div>
  );
};

export default LandingHero;
