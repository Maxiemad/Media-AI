import { motion } from 'framer-motion';
import { Brain, Cpu, Sparkles, Zap, Globe, Shield } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "Neural Architecture",
    description: "Advanced multi-modal AI processing that understands context, intent, and nuance like never before.",
    color: "#00F0FF"
  },
  {
    icon: Cpu,
    title: "Quantum Core",
    description: "Powered by next-gen quantum-classical hybrid computing for unprecedented speed and accuracy.",
    color: "#7000FF"
  },
  {
    icon: Sparkles,
    title: "Creative Engine",
    description: "Generate, iterate, and refine ideas across text, image, video, and audio in real-time.",
    color: "#00F0FF"
  },
  {
    icon: Zap,
    title: "Instant Response",
    description: "Sub-millisecond latency ensures seamless interaction without breaking your creative flow.",
    color: "#FF003C"
  },
  {
    icon: Globe,
    title: "Universal Language",
    description: "Native support for 100+ languages with cultural context awareness built-in.",
    color: "#7000FF"
  },
  {
    icon: Shield,
    title: "Secure by Design",
    description: "End-to-end encryption with privacy-first architecture. Your data stays yours.",
    color: "#00F0FF"
  }
];

export const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section 
      className="relative py-32 overflow-hidden"
      data-testid="features-section"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 spotlight opacity-50" />

      <div className="aether-container">
        {/* Section Header */}
        <div className="text-left mb-20 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] uppercase text-cyan-400 mb-4"
          >
            Capabilities
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-4xl md:text-6xl mb-6"
            data-testid="features-title"
          >
            Built for the <br />
            <span className="text-cyan-400">Impossible</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle text-lg"
          >
            AetherX redefines what AI can achieve. Six core innovations working in harmony to transform your ideas into reality.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="feature-card rounded-2xl group"
              data-testid={`feature-card-${index}`}
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ 
                  background: `linear-gradient(135deg, ${feature.color}20, transparent)`,
                  border: `1px solid ${feature.color}40`
                }}
              >
                <feature.icon 
                  className="w-7 h-7" 
                  style={{ color: feature.color }}
                  strokeWidth={1.5}
                />
              </div>
              
              <h3 className="font-syne text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
              
              <div 
                className="mt-6 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${feature.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
