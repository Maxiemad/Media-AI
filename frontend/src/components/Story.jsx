import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STORY_IMAGE = "https://images.pexels.com/photos/7662608/pexels-photo-7662608.jpeg";
const FEATURE_IMAGE = "https://images.pexels.com/photos/18068778/pexels-photo-18068778.png";

export const Story = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden"
      data-testid="story-section"
    >
      <div className="absolute inset-0 spotlight-violet opacity-30" />

      <div className="aether-container">
        {/* First Block - Image Left, Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            style={{ y: imageY, scale, rotate }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-3xl blur-2xl" />
            <motion.img
              src={STORY_IMAGE}
              alt="Cinematic Astronaut"
              className="relative rounded-2xl w-full aspect-[4/5] object-cover"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              data-testid="story-image-1"
            />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '60%' }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute bottom-8 left-8 h-1 bg-gradient-to-r from-cyan-400 to-transparent"
            />
          </motion.div>

          <motion.div style={{ y: textY }} className="space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.3em] uppercase text-violet-400"
            >
              The Vision
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title text-4xl md:text-5xl leading-tight"
              data-testid="story-title"
            >
              Beyond the <br />
              <span className="text-violet-400">Horizon of</span> <br />
              Possibility
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-gray-400"
            >
              <p className="text-lg leading-relaxed">
                In 2024, a team of visionaries asked a simple question: 
                <span className="text-white font-medium"> What if AI could truly understand the depths of human creativity?</span>
              </p>
              <p className="leading-relaxed">
                AetherX was born from that question. Not as another tool, but as a creative partner 
                that amplifies human potential. We've spent three years pushing the boundaries of 
                what's possible, and now we're ready to share it with the world.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex gap-12 pt-4"
            >
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
            </motion.div>
          </motion.div>
        </div>

        {/* Second Block - Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            style={{ y: textY }}
            className="space-y-8 order-2 lg:order-1"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.3em] uppercase text-cyan-400"
            >
              The Technology
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title text-4xl md:text-5xl leading-tight"
            >
              Powered by <br />
              <span className="text-cyan-400">Tomorrow's</span> <br />
              Architecture
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-gray-400"
            >
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
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary text-sm mt-4"
              data-testid="learn-more-btn"
            >
              Explore the Tech
            </motion.button>
          </motion.div>

          <motion.div
            style={{ y: imageY, scale }}
            className="relative order-1 lg:order-2"
          >
            <div className="absolute -inset-4 bg-gradient-to-l from-cyan-500/20 to-violet-500/20 rounded-3xl blur-2xl" />
            <motion.img
              src={FEATURE_IMAGE}
              alt="Abstract 3D Shape"
              className="relative rounded-2xl w-full aspect-square object-cover"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              data-testid="story-image-2"
            />
            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 border border-cyan-500/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
