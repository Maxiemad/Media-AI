import { useState, useEffect } from 'react';

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
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-cyan-900/10 to-violet-900/10 blur-3xl" />
      </div>

      <div className="aether-container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-cyan-400 mb-4">
            Mark Your Calendar
          </p>
          <h2
            className="section-title text-4xl md:text-6xl"
            data-testid="countdown-title"
          >
            Launch <span className="text-cyan-400">Imminent</span>
          </h2>
        </div>

        {/* Countdown Display */}
        <div
          className="flex justify-center items-center gap-4 md:gap-8 lg:gap-12"
          data-testid="countdown-display"
        >
          {timeBlocks.map((block) => (
            <div key={block.label} className="text-center">
              <div className="relative">
                <div 
                  className="countdown-digit"
                  data-testid={`countdown-${block.label.toLowerCase()}`}
                >
                  {formatNumber(block.value)}
                </div>
              </div>
              <p className="countdown-label mt-4">
                {block.label}
              </p>
            </div>
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
      </div>
    </section>
  );
};
