import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Set launch date to 30 days from now for demo
const LAUNCH_DATE = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = LAUNCH_DATE.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section 
      className="relative py-32 overflow-hidden"
      data-testid="countdown-section"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-cyan-900/10 to-violet-900/10 blur-3xl" />
      </div>

      <div className="aether-container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] uppercase text-cyan-400 mb-4"
          >
            Mark Your Calendar
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-4xl md:text-6xl"
            data-testid="countdown-title"
          >
            Launch <span className="text-cyan-400">Imminent</span>
          </motion.h2>
        </div>

        {/* Countdown Display */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center items-center gap-4 md:gap-8 lg:gap-12"
          data-testid="countdown-display"
        >
          {timeBlocks.map((block, index) => (
            <div key={block.label} className="text-center">
              <motion.div
                className="relative"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 blur-2xl bg-cyan-500/20 rounded-full" />
                
                {/* Number */}
                <div 
                  className="countdown-digit relative"
                  data-testid={`countdown-${block.label.toLowerCase()}`}
                >
                  {formatNumber(block.value)}
                </div>
              </motion.div>
              
              {/* Label */}
              <p className="countdown-label mt-4">
                {block.label}
              </p>
              
              {/* Separator */}
              {index < timeBlocks.length - 1 && (
                <motion.span
                  className="absolute hidden md:block text-4xl text-white/20 font-light"
                  style={{ right: '-1.5rem', top: '50%', transform: 'translateY(-50%)' }}
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                </motion.span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Launch Date Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 mt-12 text-sm tracking-wide"
        >
          Official Launch: {LAUNCH_DATE.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </motion.p>

        {/* Decorative Elements */}
        <div
          className="absolute top-1/2 left-8 w-px h-32 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent opacity-50"
        />
        <div
          className="absolute top-1/2 right-8 w-px h-32 bg-gradient-to-b from-transparent via-violet-500/50 to-transparent opacity-50"
        />
      </div>
    </section>
  );
};
