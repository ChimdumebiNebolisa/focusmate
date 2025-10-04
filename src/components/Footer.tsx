import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      className="py-6 text-center text-sm bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <p className="text-gray-500 dark:text-gray-400">
          © 2025 FocusMate — Built with Chrome AI & Firebase
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;