import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                FocusMate
              </span>
            </motion.div>
            
            <p className="text-base-content/70 mb-6 max-w-md">
              Your AI-powered productivity companion. Transform text, extract tasks, 
              and boost your focus with intelligent summarization and voice commands.
            </p>
            
            <div className="flex gap-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-ghost btn-circle btn-sm"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-ghost btn-circle btn-sm"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-ghost btn-circle btn-sm"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
          
          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold text-base-content mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about-section" className="text-base-content/70 hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-base-content/70 hover:text-primary transition-colors">
                  Chrome AI
                </a>
              </li>
              <li>
                <a href="#" className="text-base-content/70 hover:text-primary transition-colors">
                  Voice Mode
                </a>
              </li>
              <li>
                <a href="#" className="text-base-content/70 hover:text-primary transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h4 className="text-sm font-semibold text-base-content mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-base-content/70 hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-base-content/70 hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-base-content/70 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-base-content/70 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
        
        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-base-300"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-base-content/60">
              © 2025 FocusMate. All rights reserved.
            </p>
            <p className="text-sm text-base-content/60">
              Built with React, Firebase, and Chrome AI
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
