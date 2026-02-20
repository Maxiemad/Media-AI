import { useState, useRef } from 'react';

const STORY_IMAGE = "https://images.pexels.com/photos/7662608/pexels-photo-7662608.jpeg";
const FEATURE_IMAGE = "https://images.pexels.com/photos/18068778/pexels-photo-18068778.png";

const Image3D = ({ src, alt, className }) => {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setTransform({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={imageRef}
      className={`relative ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect behind image */}
      <div 
        className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-3xl blur-xl"
        style={{ transform: 'translateZ(-20px)' }}
      />
      
      {/* Main image */}
      <img
        src={src}
        alt={alt}
        className="relative rounded-2xl w-full object-cover"
        style={{ transform: 'translateZ(20px)' }}
        loading="lazy"
      />
      
      {/* Floating frame */}
      <div 
        className="absolute -inset-2 border border-cyan-500/20 rounded-3xl pointer-events-none"
        style={{ transform: 'translateZ(40px)' }}
      />
    </div>
  );
};

export const Story = () => {
  return (
    <section 
      className="relative py-32 overflow-hidden scene-3d"
      data-testid="story-section"
    >
      {/* 3D Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-3xl" />
        
        {/* 3D Floating particles */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-float-3d" />
        <div className="absolute top-1/2 right-20 w-3 h-3 bg-violet-400 rounded-full animate-float-3d" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-float-3d" style={{ animationDelay: '2s' }} />
      </div>

      <div className="aether-container relative z-10">
        {/* First Block - Image Left, Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <Image3D 
            src={STORY_IMAGE}
            alt="Cinematic Astronaut"
            className="aspect-[4/5]"
          />

          <div className="space-y-8">
            <p className="text-xs tracking-[0.3em] uppercase text-violet-400">
              The Vision
            </p>
            
            <h2
              className="section-title text-4xl md:text-5xl leading-tight text-3d-subtle"
              data-testid="story-title"
            >
              Beyond the <br />
              <span className="text-violet-400">Horizon of</span> <br />
              Possibility
            </h2>
            
            <div className="space-y-6 text-gray-400">
              <p className="text-lg leading-relaxed">
                In 2024, a team of visionaries asked a simple question: 
                <span className="text-white font-medium"> What if AI could truly understand the depths of human creativity?</span>
              </p>
              <p className="leading-relaxed">
                AetherX was born from that question. Not as another tool, but as a creative partner 
                that amplifies human potential. We've spent three years pushing the boundaries of 
                what's possible, and now we're ready to share it with the world.
              </p>
            </div>

            {/* 3D Stats */}
            <div className="flex gap-12 pt-4">
              <div className="stat-3d">
                <p className="font-syne text-4xl font-bold text-cyan-400">3+</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Years R&D</p>
              </div>
              <div className="stat-3d" style={{ animationDelay: '0.2s' }}>
                <p className="font-syne text-4xl font-bold text-violet-400">50M+</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Parameters</p>
              </div>
              <div className="stat-3d" style={{ animationDelay: '0.4s' }}>
                <p className="font-syne text-4xl font-bold text-white">∞</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Possibilities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Second Block - Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <p className="text-xs tracking-[0.3em] uppercase text-cyan-400">
              The Technology
            </p>
            
            <h2 className="section-title text-4xl md:text-5xl leading-tight text-3d-subtle">
              Powered by <br />
              <span className="text-cyan-400">Tomorrow's</span> <br />
              Architecture
            </h2>
            
            <div className="space-y-6 text-gray-400">
              <p className="text-lg leading-relaxed">
                Our proprietary neural architecture combines 
                <span className="text-white font-medium"> quantum-inspired algorithms</span> with 
                advanced transformer models to achieve unprecedented levels of understanding.
              </p>
              <p className="leading-relaxed">
                AetherX doesn't just process information—it comprehends context, emotion, and intent. 
                The result is an AI that feels less like a tool and more like a collaborator who 
                truly gets you.
              </p>
            </div>

            <button
              className="btn-3d btn-secondary text-sm mt-4"
              data-testid="learn-more-btn"
            >
              Explore the Tech
            </button>
          </div>

          <div className="relative order-1 lg:order-2">
            <Image3D 
              src={FEATURE_IMAGE}
              alt="Abstract 3D Shape"
              className="aspect-square"
            />
            
            {/* Orbiting ring */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-cyan-500/30 rounded-full animate-rotate-3d" />
          </div>
        </div>
      </div>
    </section>
  );
};
