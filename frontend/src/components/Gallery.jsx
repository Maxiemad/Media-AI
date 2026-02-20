import { useState, useRef } from 'react';

const galleryImages = [
  {
    src: "https://images.pexels.com/photos/18068747/pexels-photo-18068747.png",
    alt: "Neural Network Visualization",
    title: "Neural Architecture",
    className: "bento-item-1"
  },
  {
    src: "https://images.pexels.com/photos/8108085/pexels-photo-8108085.jpeg",
    alt: "Cyberpunk Fashion",
    title: "Creative Vision",
    className: "bento-item-2"
  },
  {
    src: "https://images.pexels.com/photos/7662608/pexels-photo-7662608.jpeg",
    alt: "Astronaut Cinematic",
    title: "Exploration",
    className: "bento-item-3"
  },
  {
    src: "https://images.pexels.com/photos/18068778/pexels-photo-18068778.png",
    alt: "Abstract 3D Shape",
    title: "Innovation",
    className: "bento-item-4"
  },
  {
    src: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
    alt: "Tech Interface",
    title: "Interface Design",
    className: "bento-item-5"
  }
];

const GalleryItem3D = ({ image, index }) => {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const itemRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    setTransform({ rotateX, rotateY, scale: 1.02 });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  return (
    <div
      ref={itemRef}
      className={`gallery-item-3d ${image.className}`}
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid={`gallery-item-${index}`}
    >
      {/* Image */}
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="w-full h-full object-cover"
        style={{ transform: 'translateZ(10px)' }}
      />
      
      {/* 3D Overlay */}
      <div 
        className="gallery-overlay-3d"
        style={{ transform: 'translateZ(20px)' }}
      >
        <div className="absolute bottom-6 left-6">
          <p 
            className="text-xs tracking-[0.2em] uppercase text-cyan-400 mb-1"
            style={{ transform: 'translateZ(10px)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </p>
          <h3 
            className="font-syne text-xl font-bold"
            style={{ transform: 'translateZ(15px)' }}
          >
            {image.title}
          </h3>
        </div>
      </div>
      
      {/* 3D Frame */}
      <div 
        className="absolute inset-0 border border-white/0 group-hover:border-cyan-500/30 rounded-xl pointer-events-none transition-colors"
        style={{ transform: 'translateZ(30px)' }}
      />
    </div>
  );
};

export const Gallery = () => {
  return (
    <section 
      className="relative py-32 overflow-hidden scene-3d"
      data-testid="gallery-section"
    >
      {/* 3D Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="aether-container relative z-10">
        {/* Section Header */}
        <div className="text-left mb-16 max-w-2xl">
          <p className="text-xs tracking-[0.3em] uppercase text-cyan-400 mb-4">
            Visual Experience
          </p>
          <h2
            className="section-title text-4xl md:text-6xl mb-6 text-3d-subtle"
            data-testid="gallery-title"
          >
            A Glimpse Into <br />
            <span className="text-violet-400">Tomorrow</span>
          </h2>
          <p className="section-subtitle text-lg">
            Explore the visual language of AetherX — where technology becomes art and imagination knows no limits.
          </p>
        </div>

        {/* 3D Bento Grid Gallery */}
        <div className="bento-grid-3d" data-testid="gallery-grid">
          {galleryImages.map((image, index) => (
            <GalleryItem3D key={image.alt} image={image} index={index} />
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="h-px bg-gradient-to-r from-cyan-500/50 via-violet-500/50 to-transparent mt-16" />
      </div>
    </section>
  );
};
