import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Mic, Sparkles, Keyboard } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'On-Device AI Processing',
    description: 'All processing happens locally using Chrome\'s built-in AI—no data leaves your device.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Mic,
    title: 'Voice Input & File Upload',
    description: 'Speak your ideas or upload files for instant processing. Multiple input methods for your convenience.',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Sparkles,
    title: 'Multiple Processing Modes',
    description: 'Choose from Academic, Concise, Creative, or Conversational styles to match your needs.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Keyboard,
    title: 'Keyboard Shortcuts',
    description: 'Power users can navigate and process text with lightning speed using keyboard shortcuts.',
    color: 'from-orange-500 to-orange-600',
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need for efficient text processing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;


