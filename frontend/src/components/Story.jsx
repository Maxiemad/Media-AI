const STORY_IMAGE = "https://images.pexels.com/photos/7662608/pexels-photo-7662608.jpeg";
const FEATURE_IMAGE = "https://images.pexels.com/photos/18068778/pexels-photo-18068778.png";

export const Story = () => {
  return (
    <section 
      className="relative py-32 overflow-hidden"
      data-testid="story-section"
    >
      <div className="absolute inset-0 spotlight-violet opacity-30" />

      <div className="aether-container">
        {/* First Block - Image Left, Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 rounded-3xl blur-xl" />
            <img
              src={STORY_IMAGE}
              alt="Cinematic Astronaut"
              className="relative rounded-2xl w-full aspect-[4/5] object-cover"
              data-testid="story-image-1"
              loading="lazy"
            />
            <div className="absolute bottom-8 left-8 h-1 w-[60%] bg-gradient-to-r from-cyan-400 to-transparent" />
          </div>

          <div className="space-y-8">
            <p className="text-xs tracking-[0.3em] uppercase text-violet-400">
              The Vision
            </p>
            
            <h2
              className="section-title text-4xl md:text-5xl leading-tight"
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

            <div className="flex gap-12 pt-4">
              <div>
                <p className="font-syne text-4xl font-bold text-cyan-400">3+</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Years R&D</p>
              </div>
              <div>
                <p className="font-syne text-4xl font-bold text-violet-400">50M+</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Parameters</p>
              </div>
              <div>
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
            
            <h2 className="section-title text-4xl md:text-5xl leading-tight">
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
              className="btn-secondary text-sm mt-4"
              data-testid="learn-more-btn"
            >
              Explore the Tech
            </button>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute -inset-4 bg-gradient-to-l from-cyan-500/10 to-violet-500/10 rounded-3xl blur-xl" />
            <img
              src={FEATURE_IMAGE}
              alt="Abstract 3D Shape"
              className="relative rounded-2xl w-full aspect-square object-cover"
              data-testid="story-image-2"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-cyan-500/30 rounded-full animate-rotate-slow" />
          </div>
        </div>
      </div>
    </section>
  );
};
