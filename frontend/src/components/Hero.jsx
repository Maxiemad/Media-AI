import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';

const HERO_IMAGE = "https://images.pexels.com/photos/18068747/pexels-photo-18068747.png";

export const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const title = "AETHERX";

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background */}
      <div className="hero-background">
        <motion.img
          src={HERO_IMAGE}
          alt="Abstract AI Neural Network"
          className="hero-image"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>

      {/* Floating Orbs - CSS animation only */}
      <div
        className="floating-element floating-orb orb-cyan animate-float"
        style={{ top: '20%', left: '10%' }}
      />
      <div
        className="floating-element floating-orb orb-violet animate-float"
        style={{ bottom: '20%', right: '10%', animationDelay: '3s' }}
      />

      {/* Content */}
      <div className="relative z-10 aether-container text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Caption */}
          <motion.p 
            variants={itemVariants}
            className="text-xs tracking-[0.3em] uppercase text-cyan-400 font-space"
            data-testid="hero-caption"
          >
            Introducing the Future
          </motion.p>

          {/* Title */}
          <div className="overflow-hidden py-2">
            <motion.h1 
              variants={itemVariants}
              className="font-syne text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter"
              data-testid="hero-title"
              style={{
                background: 'linear-gradient(180deg, #00F0FF 0%, #7000FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {title}
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl font-space text-gray-400 max-w-2xl mx-auto"
            data-testid="hero-tagline"
          >
            Where Intelligence Meets Imagination.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <motion.button
              onClick={() => setShowVideo(true)}
              className="play-button group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              data-testid="watch-trailer-btn"
            >
              <Play className="w-8 h-8 text-cyan-400 ml-1 group-hover:text-white transition-colors" />
            </motion.button>
            <motion.button
              onClick={() => setShowVideo(true)}
              className="btn-secondary text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="watch-trailer-text-btn"
            >
              Watch Trailer
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2"
            >
              <motion.div className="w-1 h-2 bg-cyan-400 rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="video-modal-overlay"
          onClick={() => setShowVideo(false)}
          data-testid="video-modal"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
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
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};
