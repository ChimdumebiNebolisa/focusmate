import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      className="py-6 text-center text-sm opacity-70 bg-base-100 border-t border-base-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 0.7, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <p className="text-base-content/60">
          © 2025 FocusMate — Built with Chrome AI & Firebase
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;