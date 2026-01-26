import { useState, useEffect, useRef, useMemo } from 'react';

interface WordConfig {
  text: string;
  importance: number; // 1-10, higher = more important
  x: number; // Position in circle
  y: number;
  baseSize: number; // Base font size multiplier
}

interface WordProps {
  config: WordConfig;
  mousePosition: { x: number; y: number };
  containerRef: React.RefObject<HTMLDivElement>;
}

const Word = ({ config, mousePosition, containerRef }: WordProps) => {
  const wordRef = useRef<HTMLDivElement>(null);
  const [wordPosition, setWordPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = () => {
      if (wordRef.current && containerRef.current) {
        const wordRect = wordRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        setWordPosition({
          x: wordRect.left - containerRect.left + wordRect.width / 2,
          y: wordRect.top - containerRect.top + wordRect.height / 2
        });
      }
    };

    updatePosition();
    // Add slight delay for initial positioning
    setTimeout(updatePosition, 100);
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [containerRef]);

  const calculateScale = () => {
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - wordPosition.x, 2) +
      Math.pow(mousePosition.y - wordPosition.y, 2)
    );

    const maxDistance = 180;
    const minScale = 1;
    const maxScale = 2.2;

    if (distance > maxDistance) return minScale;

    const scale = maxScale - (distance / maxDistance) * (maxScale - minScale);
    return scale;
  };

  const scale = calculateScale();

  return (
    <div
      ref={wordRef}
      className="absolute text-foreground font-semibold cursor-pointer select-none hover:text-primary"
      style={{
        left: `${config.x}%`,
        top: `${config.y}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), color 0.2s ease',
        fontSize: `${config.baseSize}rem`,
        whiteSpace: 'nowrap',
        zIndex: Math.round(scale * 10),
        fontWeight: config.importance > 7 ? 700 : 600
      }}
    >
      {config.text}
    </div>
  );
};

const AppleWatchWords = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Define words with importance weights
  const wordConfigs = useMemo(() => {
    const words: { text: string; importance: number }[] = [
      { text: 'AI', importance: 10 },
      { text: 'Design', importance: 10 },
      { text: 'Creativity', importance: 9 },
      { text: 'Innovation', importance: 9 },
      { text: 'Automation', importance: 8 },
      { text: 'Strategy', importance: 8 },
      { text: 'Branding', importance: 8 },
      { text: 'Digital', importance: 7 },
      { text: 'Future', importance: 7 },
      { text: 'Smart', importance: 7 },
      { text: 'Data', importance: 7 },
      { text: 'UX/UI', importance: 8 },
      { text: 'Web', importance: 6 },
      { text: 'Mobile', importance: 6 },
      { text: 'Cloud', importance: 6 },
      { text: 'Tech', importance: 6 },
      { text: 'Growth', importance: 7 },
      { text: 'Marketing', importance: 6 },
      { text: 'Solutions', importance: 7 },
      { text: 'Vision', importance: 8 },
      { text: 'Transform', importance: 7 },
      { text: 'Modern', importance: 6 },
      { text: 'Dynamic', importance: 6 },
      { text: 'Analytics', importance: 7 }
    ];

    // Position words in circular pattern
    // Important words closer to center
    return words.map((word, index) => {
      // Calculate radius based on importance (inverse - higher importance = closer to center)
      const normalizedImportance = (word.importance - 5) / 5; // 0-1 range
      const minRadius = 8; // Closest to center
      const maxRadius = 45; // Farthest from center
      const radius = maxRadius - (normalizedImportance * (maxRadius - minRadius));

      // Random angle for circular distribution
      const angle = (index / words.length) * Math.PI * 2 + (Math.random() - 0.5) * 0.8;

      // Convert polar to cartesian coordinates
      // Center is at 50%, 50%
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);

      // Base size correlates with importance
      const baseSize = 0.75 + (word.importance / 10) * 0.65; // 0.75rem to 1.4rem

      return {
        text: word.text,
        importance: word.importance,
        x,
        y,
        baseSize
      };
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ minHeight: '400px' }}
    >
      <div
        className="relative w-full h-full"
        style={{ perspective: '1000px' }}
      >
        {wordConfigs.map((config, index) => (
          <Word
            key={index}
            config={config}
            mousePosition={mousePosition}
            containerRef={containerRef}
          />
        ))}
      </div>
    </div>
  );
};

export default AppleWatchWords;
