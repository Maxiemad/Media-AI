import { useState, useEffect, useRef } from 'react';
import { Play, X } from 'lucide-react';

const HERO_IMAGE = "https://images.pexels.com/photos/18068747/pexels-photo-18068747.png";

export const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 50;
      const y = (e.clientY - rect.top - rect.height / 2) / 50;
      setMousePos({ x, y });
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (hero) hero.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden scene-3d"
      data-testid="hero-section"
    >
      {/* 3D Background Layers */}
      <div className="absolute inset-0 layer-3d">
        {/* Deep Background Layer */}
        <div 
          className="absolute inset-0 transition-transform duration-300"
          style={{ 
            transform: `translateZ(-100px) scale(1.2) rotateX(${mousePos.y * 0.5}deg) rotateY(${mousePos.x * 0.5}deg)` 
          }}
        >
          <img
            src={HERO_IMAGE}
            alt="Abstract AI Neural Network"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        {/* Mid Layer - Gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030305]/50 to-[#030305] transition-transform duration-300"
          style={{ 
            transform: `translateZ(-50px) rotateX(${mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)` 
          }}
        />
      </div>

      {/* 3D Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Rotating Cube Frame */}
        <div 
          className="absolute top-20 left-20 w-32 h-32 border border-cyan-500/30 animate-rotate-3d"
          style={{ transformStyle: 'preserve-3d' }}
        />
        
        {/* Floating Ring */}
        <div 
          className="absolute bottom-32 right-20 w-48 h-48 border-2 border-violet-500/20 rounded-full animate-float-3d"
          style={{ animationDelay: '1s' }}
        />
        
        {/* 3D Pyramid Shape */}
        <div 
          className="absolute top-1/3 right-1/4 animate-float-3d"
          style={{ animationDelay: '2s', transformStyle: 'preserve-3d' }}
        >
          <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[50px] border-b-cyan-500/20" />
        </div>

        {/* Floating Orbs with 3D depth */}
        <div 
          className="absolute top-1/4 left-1/6 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl animate-float-3d"
          style={{ transform: `translateZ(50px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/6 w-60 h-60 bg-violet-500/10 rounded-full blur-xl animate-float-3d"
          style={{ animationDelay: '3s', transform: `translateZ(30px)` }}
        />
      </div>

      {/* 3D Content */}
      <div 
        className="relative z-10 aether-container text-center layer-3d transition-transform duration-200"
        style={{ 
          transform: `perspective(1000px) rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg) translateZ(50px)` 
        }}
      >
        <div className="space-y-8">
          {/* Caption - floating above */}
          <p 
            className="text-xs tracking-[0.3em] uppercase text-cyan-400 font-space"
            style={{ transform: 'translateZ(60px)' }}
            data-testid="hero-caption"
          >
            Introducing the Future
          </p>

          {/* 3D Title */}
          <h1 
            className="font-syne text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter hero-title-3d"
            data-testid="hero-title"
            style={{ transform: 'translateZ(80px)' }}
          >
            AETHERX
          </h1>

          {/* Tagline */}
          <p 
            className="text-xl md:text-2xl font-space text-gray-400 max-w-2xl mx-auto"
            style={{ transform: 'translateZ(40px)' }}
            data-testid="hero-tagline"
          >
            Where Intelligence Meets Imagination.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            style={{ transform: 'translateZ(30px)' }}
          >
            <button
              onClick={() => setShowVideo(true)}
              className="play-button-3d group"
              data-testid="watch-trailer-btn"
            >
              <Play className="w-8 h-8 text-cyan-400 ml-1 group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={() => setShowVideo(true)}
              className="btn-secondary text-sm btn-3d"
              data-testid="watch-trailer-text-btn"
            >
              Watch Trailer
            </button>
          </div>
        </div>

        {/* 3D Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ transform: 'translateZ(20px)' }}>
          <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2 animate-bounce-slow">
            <div className="w-1 h-2 bg-cyan-400 rounded-full" />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="video-modal-overlay"
          onClick={() => setShowVideo(false)}
          data-testid="video-modal"
        >
          <div
            className="video-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
              data-testid="close-video-btn"
            >
              <X className="w-8 h-8" />
            </button>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="AetherX Trailer"
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};
