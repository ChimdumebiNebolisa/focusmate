import React from 'react';

const AboutSection: React.FC = () => {
  const features = [
    {
      title: "AI-Powered Clarity",
      desc: "Clean up messy notes or speech with Chrome's on-device AI summarizer and rewriter.",
      icon: "🤖",
    },
    {
      title: "Voice to Ideas",
      desc: "Speak naturally — FocusMate turns your voice into organized text or translations instantly.",
      icon: "🎙️",
    },
    {
      title: "Smart Workspace",
      desc: "Save, revisit, and manage your sessions securely through Firebase history syncing.",
      icon: "📚",
    },
  ];

  return (
    <section id="about-section" className="py-20 bg-base-100 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">What FocusMate Does</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {features.map((f, i) => (
          <div
            key={i}
            className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 p-8"
          >
            <div className="text-5xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-base opacity-80">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
