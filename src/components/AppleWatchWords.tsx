import { useState, useEffect, useRef } from 'react';

const AppleWatchWords = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const words = [
    'AI',
    'Design',
    'Creative',
    'Innovation',
    'Strategy',
    'Branding',
    'UX/UI',
    'Digital',
    'Smart',
    'Growth',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [words.length]);

  // Get visible words (3 before, current, 3 after)
  const getVisibleWords = () => {
    const visible = [];
    for (let i = -3; i <= 3; i++) {
      const index = (currentIndex + i + words.length) % words.length;
      visible.push({
        text: words[index],
        offset: i,
      });
    }
    return visible;
  };

  const visibleWords = getVisibleWords();

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{
        minHeight: '400px',
        perspective: '1000px',
      }}
    >
      <div className="relative w-full h-full">
        {visibleWords.map((word, idx) => {
          const { offset, text } = word;

          // Calculate 3D rotation and position
          const rotateY = offset * 35; // Degrees
          const translateZ = Math.abs(offset) === 0 ? 100 : -Math.abs(offset) * 50;
          const opacity = Math.max(0, 1 - Math.abs(offset) * 0.3);
          const scale = Math.max(0.4, 1 - Math.abs(offset) * 0.15);

          return (
            <div
              key={`${text}-${idx}`}
              className="absolute inset-0 flex items-center justify-center font-bold cursor-pointer select-none"
              style={{
                transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
                opacity: opacity,
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                fontSize: offset === 0 ? '3rem' : '2rem',
                color: offset === 0 ? '#000000' : '#666666',
                zIndex: offset === 0 ? 10 : Math.max(0, 10 - Math.abs(offset)),
                pointerEvents: offset === 0 ? 'auto' : 'none',
                textShadow: offset === 0 ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              {text}
            </div>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {words.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: idx === currentIndex ? '#000000' : '#cccccc',
              transform: idx === currentIndex ? 'scale(1.2)' : 'scale(1)',
            }}
            aria-label={`Go to word ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AppleWatchWords;
