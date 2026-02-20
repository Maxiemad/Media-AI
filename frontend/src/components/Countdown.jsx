import { useState, useEffect } from 'react';

// Set launch date to 30 days from now for demo
const LAUNCH_DATE = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

const CountdownBlock = ({ value, label, delay }) => {
  return (
    <div 
      className="countdown-block-3d text-center"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* 3D Number Container */}
      <div className="relative" style={{ perspective: '500px' }}>
        {/* Glow */}
        <div className="absolute inset-0 blur-2xl bg-cyan-500/20 rounded-full" />
        
        {/* 3D Number */}
        <div 
          className="countdown-digit-3d relative"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'rotateX(10deg)'
          }}
        >
          {String(value).padStart(2, '0')}
        </div>
      </div>
      
      {/* Label */}
      <p className="countdown-label mt-4">
        {label}
      </p>
    </div>
  );
};

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

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section 
      className="relative py-32 overflow-hidden scene-3d"
      data-testid="countdown-section"
    >
      {/* 3D Background */}
      <div className="absolute inset-0">
        {/* Central orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-900/10 to-violet-900/10 blur-3xl animate-pulse" />
        </div>
        
        {/* 3D Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'center top'
          }}
        />
      </div>

      <div className="aether-container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-cyan-400 mb-4">
            Mark Your Calendar
          </p>
          <h2
            className="section-title text-4xl md:text-6xl text-3d-subtle"
            data-testid="countdown-title"
          >
            Launch <span className="text-cyan-400">Imminent</span>
          </h2>
        </div>

        {/* 3D Countdown Display */}
        <div
          className="flex justify-center items-center gap-4 md:gap-8 lg:gap-16"
          data-testid="countdown-display"
          style={{ perspective: '1000px' }}
        >
          {timeBlocks.map((block, index) => (
            <CountdownBlock 
              key={block.label}
              value={block.value}
              label={block.label}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Launch Date Text */}
        <p className="text-center text-gray-500 mt-12 text-sm tracking-wide">
          Official Launch: {LAUNCH_DATE.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>

        {/* 3D Decorative lines */}
        <div className="absolute top-1/2 left-0 w-32 h-px bg-gradient-to-r from-transparent to-cyan-500/50" />
        <div className="absolute top-1/2 right-0 w-32 h-px bg-gradient-to-l from-transparent to-violet-500/50" />
      </div>
    </section>
  );
};
