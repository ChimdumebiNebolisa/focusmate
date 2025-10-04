import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Mic, Database } from 'lucide-react';

const AboutSection: React.FC = () => {
  const features = [
    {
      title: "AI-Powered Clarity",
      desc: "Clean up messy notes or speech with Chrome's on-device AI summarizer and rewriter.",
      icon: Brain,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Voice to Ideas",
      desc: "Speak naturally — FocusMate turns your voice into organized text or translations instantly.",
      icon: Mic,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Smart Workspace",
      desc: "Save, revisit, and manage your sessions securely through Firebase history syncing.",
      icon: Database,
      color: "from-purple-500 to-violet-600",
    },
  ];

  return (
    <section id="about-section" className="py-20 bg-base-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            What FocusMate Does
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Transform your thoughts into organized, actionable content with AI-powered tools
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="group"
            >
              <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 p-8 h-full border border-base-300">
                <div className="card-body items-center text-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="card-title text-xl font-bold mb-4 text-base-content">
                    {feature.title}
                  </h3>
                  
                  <p className="text-base-content/70 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-base-content">
            Ready to focus smarter?
          </h3>
          <p className="text-base-content/70 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already organizing their thoughts with FocusMate
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary btn-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            onClick={() => window.location.href = '/dashboard'}
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
