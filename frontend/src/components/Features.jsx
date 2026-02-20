import { useState, useRef } from 'react';
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

const Card3D = ({ feature, index }) => {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setTransform({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="feature-card-3d rounded-2xl group"
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid={`feature-card-${index}`}
    >
      {/* Glowing border effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ 
          background: `linear-gradient(135deg, ${feature.color}20, transparent)`,
          transform: 'translateZ(-10px)'
        }}
      />
      
      {/* Card content with 3D depth */}
      <div className="relative z-10 p-8" style={{ transform: 'translateZ(30px)' }}>
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
          style={{ 
            background: `linear-gradient(135deg, ${feature.color}20, transparent)`,
            border: `1px solid ${feature.color}40`,
            transform: 'translateZ(20px)'
          }}
        >
          <feature.icon 
            className="w-7 h-7" 
            style={{ color: feature.color }}
            strokeWidth={1.5}
          />
        </div>
        
        <h3 
          className="font-syne text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors"
          style={{ transform: 'translateZ(15px)' }}
        >
          {feature.title}
        </h3>
        
        <p 
          className="text-gray-400 text-sm leading-relaxed"
          style={{ transform: 'translateZ(10px)' }}
        >
          {feature.description}
        </p>
        
        <div 
          className="mt-6 h-px w-0 group-hover:w-full transition-all duration-500"
          style={{ background: `linear-gradient(90deg, ${feature.color}, transparent)` }}
        />
      </div>
    </div>
  );
};

export const Features = () => {
  return (
    <section 
      className="relative py-32 overflow-hidden scene-3d"
      data-testid="features-section"
    >
      {/* 3D Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        
        {/* 3D Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-violet-500 to-transparent" />
        </div>
      </div>

      <div className="aether-container relative z-10">
        {/* Section Header */}
        <div className="text-left mb-20 max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase text-cyan-400 mb-4">
            Capabilities
          </p>
          <h2
            className="section-title text-4xl md:text-6xl mb-6 text-3d-subtle"
            data-testid="features-title"
          >
            Built for the <br />
            <span className="text-cyan-400">Impossible</span>
          </h2>
          <p className="section-subtitle text-lg">
            AetherX redefines what AI can achieve. Six core innovations working in harmony to transform your ideas into reality.
          </p>
        </div>

        {/* 3D Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card3D key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
