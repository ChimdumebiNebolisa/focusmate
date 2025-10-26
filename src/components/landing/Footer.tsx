import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
              FocusMate
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              AI-powered text processing with complete privacy.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/ChimdumebiNebolisa/focusmate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/ChimdumebiNebolisa/focusmate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="/CHROME_AI_SETUP.md"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Chrome AI Setup Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Requirements */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Requirements
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>Chrome 138+</li>
              <li>AI features enabled</li>
              <li>2GB+ free storage</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 FocusMate. Built with React, TypeScript, and Chrome AI.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

