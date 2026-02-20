import { useState } from 'react';
import { Play, X } from 'lucide-react';

const HERO_IMAGE = "https://images.pexels.com/photos/18068747/pexels-photo-18068747.png";

export const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);

  const title = "AETHERX";

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background */}
      <div className="hero-background">
        <img
          src={HERO_IMAGE}
          alt="Abstract AI Neural Network"
          className="hero-image opacity-60"
        />
      </div>

      {/* Floating Orbs - CSS only */}
      <div className="floating-element floating-orb orb-cyan animate-float" style={{ top: '20%', left: '10%' }} />
      <div className="floating-element floating-orb orb-violet animate-float" style={{ bottom: '20%', right: '10%', animationDelay: '3s' }} />

      {/* Content */}
      <div className="relative z-10 aether-container text-center">
        <div className="space-y-8 animate-fade-in">
          {/* Caption */}
          <p 
            className="text-xs tracking-[0.3em] uppercase text-cyan-400 font-space"
            data-testid="hero-caption"
          >
            Introducing the Future
          </p>

          {/* Title */}
          <h1 
            className="font-syne text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter hero-title"
            data-testid="hero-title"
          >
            {title}
          </h1>

          {/* Tagline */}
          <p 
            className="text-xl md:text-2xl font-space text-gray-400 max-w-2xl mx-auto"
            data-testid="hero-tagline"
          >
            Where Intelligence Meets Imagination.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button
              onClick={() => setShowVideo(true)}
              className="play-button group"
              data-testid="watch-trailer-btn"
            >
              <Play className="w-8 h-8 text-cyan-400 ml-1 group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={() => setShowVideo(true)}
              className="btn-secondary text-sm"
              data-testid="watch-trailer-text-btn"
            >
              Watch Trailer
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2 animate-bounce-slow">
              <div className="w-1 h-2 bg-cyan-400 rounded-full" />
            </div>
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
