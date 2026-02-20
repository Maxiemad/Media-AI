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

export const Gallery = () => {
  return (
    <section 
      className="relative py-32 overflow-hidden"
      data-testid="gallery-section"
    >
      <div className="absolute inset-0 spotlight opacity-30" />

      <div className="aether-container">
        {/* Section Header */}
        <div className="text-left mb-16 max-w-2xl">
          <p className="text-xs tracking-[0.3em] uppercase text-cyan-400 mb-4">
            Visual Experience
          </p>
          <h2
            className="section-title text-4xl md:text-6xl mb-6"
            data-testid="gallery-title"
          >
            A Glimpse Into <br />
            <span className="text-violet-400">Tomorrow</span>
          </h2>
          <p className="section-subtitle text-lg">
            Explore the visual language of AetherX — where technology becomes art and imagination knows no limits.
          </p>
        </div>

        {/* Bento Grid Gallery */}
        <div className="bento-grid" data-testid="gallery-grid">
          {galleryImages.map((image, index) => (
            <div
              key={image.alt}
              className={`gallery-item ${image.className}`}
              data-testid={`gallery-item-${index}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
              />
              <div className="gallery-overlay">
                <div className="absolute bottom-6 left-6">
                  <p className="text-xs tracking-[0.2em] uppercase text-cyan-400 mb-1">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-syne text-xl font-bold">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="h-px bg-gradient-to-r from-cyan-500/50 via-violet-500/50 to-transparent mt-16" />
      </div>
    </section>
  );
};
