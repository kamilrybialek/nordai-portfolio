import { useState, useEffect, useRef, useMemo } from 'react';

interface WordConfig {
  text: string;
  importance: number;
  x: number;
  y: number;
  baseSize: number;
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
    setTimeout(updatePosition, 100);
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [containerRef]);

  const calculateScale = () => {
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - wordPosition.x, 2) +
      Math.pow(mousePosition.y - wordPosition.y, 2)
    );

    const maxDistance = 140;
    const minScale = 0.9;
    const maxScale = 1.6;

    if (distance > maxDistance) return minScale;

    const normalizedDistance = distance / maxDistance;
    const scale = maxScale - (Math.pow(normalizedDistance, 1.8) * (maxScale - minScale));
    return scale;
  };

  const scale = calculateScale();
  const opacity = 0.5 + (config.importance / 10) * 0.5;

  return (
    <div
      ref={wordRef}
      className="absolute font-semibold cursor-pointer select-none hover:text-primary hover:[text-shadow:0_2px_8px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.1)]"
      style={{
        left: `${config.x}%`,
        top: `${config.y}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transition: 'transform 0.18s cubic-bezier(0.25, 0.1, 0.25, 1), color 0.2s ease, text-shadow 0.2s ease',
        fontSize: `${config.baseSize}rem`,
        whiteSpace: 'nowrap',
        color: `hsl(0, 0%, ${10 + opacity * 40}%)`,
        fontWeight: config.importance > 7 ? 700 : 600,
        zIndex: Math.round(scale * 10),
      }}
    >
      {config.text}
    </div>
  );
};

const AppleWatchWords = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  const wordConfigs = useMemo(() => {
    // Seeded random function for consistent positioning
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    const words: { text: string; importance: number }[] = [
      // Center (importance 10) - 2 words
      { text: 'AI', importance: 10 },
      { text: 'Design', importance: 10 },

      // High importance (9-8)
      { text: 'Creative', importance: 9 },
      { text: 'Innovation', importance: 9 },
      { text: 'Strategy', importance: 8 },
      { text: 'Branding', importance: 8 },
      { text: 'UX/UI', importance: 8 },
      { text: 'Vision', importance: 8 },

      // Medium importance (7-6)
      { text: 'Digital', importance: 7 },
      { text: 'Smart', importance: 7 },
      { text: 'Data', importance: 7 },
      { text: 'Growth', importance: 7 },
      { text: 'Web', importance: 6 },
      { text: 'Mobile', importance: 6 },
      { text: 'Cloud', importance: 6 },
      { text: 'Tech', importance: 6 },
    ];

    const configs: WordConfig[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5 degrees

    // Separate center words (AI, Design) and others
    const centerWords = words.filter(w => w.importance === 10);
    const otherWords = words.filter(w => w.importance < 10);

    // Position center words manually to avoid overlap
    centerWords.forEach((word, i) => {
      const angle = (i / centerWords.length) * Math.PI * 2 - Math.PI / 2;
      const radius = 10; // Small radius for center words

      configs.push({
        text: word.text,
        importance: word.importance,
        x: 50 + radius * Math.cos(angle),
        y: 50 + radius * Math.sin(angle),
        baseSize: 1.3,
      });
    });

    // Position other words with spiral
    otherWords.forEach((word, i) => {
      // Calculate spiral position using golden angle
      const angle = i * goldenAngle;

      // Map importance to radius (9 = inner, 6 = outer)
      const normalizedImportance = (9 - word.importance) / 3; // 0 to 1
      // Use seeded random for consistent positioning
      const radiusVariation = (seededRandom(i * 123) - 0.5) * 8;
      const radius = 18 + normalizedImportance * 28 + radiusVariation;

      // Add slight angle variation for organic feel using seeded random
      const angleVariation = (seededRandom(i * 456 + 789) - 0.5) * 0.3;
      const finalAngle = angle + angleVariation;

      // Calculate position
      const x = 50 + radius * Math.cos(finalAngle);
      const y = 50 + radius * Math.sin(finalAngle);

      // Size based on importance
      const baseSize = word.importance >= 8 ? 1.1 :
                       word.importance >= 7 ? 0.95 : 0.85;

      configs.push({
        text: word.text,
        importance: word.importance,
        x,
        y,
        baseSize,
      });
    });

    return configs;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          });
        }
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ minHeight: '400px' }}
    >
      <div className="relative w-full h-full">
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
