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
  return (
    <section 
      className="relative py-32 overflow-hidden"
      data-testid="features-section"
    >
      <div className="absolute inset-0 spotlight opacity-50" />

      <div className="aether-container">
        {/* Section Header */}
        <div className="text-left mb-20 max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase text-cyan-400 mb-4">
            Capabilities
          </p>
          <h2
            className="section-title text-4xl md:text-6xl mb-6"
            data-testid="features-title"
          >
            Built for the <br />
            <span className="text-cyan-400">Impossible</span>
          </h2>
          <p className="section-subtitle text-lg">
            AetherX redefines what AI can achieve. Six core innovations working in harmony to transform your ideas into reality.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
