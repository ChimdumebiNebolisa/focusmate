import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, Download } from 'lucide-react';

const steps = [
  {
    number: '1',
    icon: FileText,
    title: 'Input Your Text',
    description: 'Type, speak, or upload your text to get started.',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    number: '2',
    icon: Sparkles,
    title: 'AI Processing',
    description: 'Chrome\'s on-device AI processes your text instantly and privately.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    number: '3',
    icon: Download,
    title: 'Get Results',
    description: 'Copy or download your processed text in seconds.',
    color: 'from-pink-500 to-pink-600',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Simple, fast, and completely private
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connection Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-24 left-full w-full h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 -z-10" />
              )}
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
                <div className="flex justify-center mb-4">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="absolute -top-3 -left-3 w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;



