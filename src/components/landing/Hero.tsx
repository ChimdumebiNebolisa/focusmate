import React from 'react';
import { motion } from 'framer-motion';
import { Brain, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { aiStatusMonitor } from '../../utils/aiStatusMonitor';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const aiStatus = aiStatusMonitor.getStatus();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
      
      {/* Floating Sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* AI Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
            aiStatusMonitor.isReadyForUse()
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              aiStatusMonitor.isReadyForUse() ? 'bg-green-500' : 'bg-yellow-500'
            }`}></div>
            {aiStatusMonitor.isReadyForUse()
              ? 'AI Ready'
              : aiStatus.isAvailable
                ? 'AI Limited'
                : 'AI Unavailable'}
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
        >
          AI-Powered Text Processing
          <span className="block mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Right in Your Browser
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          FocusMate uses Chrome's on-device AI to process your text—all locally, with complete privacy and lightning-fast results.
        </motion.p>

        {/* Animated Brain Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center mb-10"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="relative"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(99, 102, 241, 0.4)",
                  "0 0 0 20px rgba(99, 102, 241, 0)",
                  "0 0 0 0 rgba(99, 102, 241, 0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="absolute inset-0 rounded-full"
            />
            <div className="bg-white dark:bg-gray-800 p-6 rounded-full shadow-2xl">
              <Brain size={80} className="text-indigo-600 dark:text-indigo-400 relative z-10" />
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center gap-4"
        >
          <motion.button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;


