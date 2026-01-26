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
      className="absolute font-semibold cursor-pointer select-none hover:text-primary"
      style={{
        left: `${config.x}%`,
        top: `${config.y}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transition: 'transform 0.18s cubic-bezier(0.25, 0.1, 0.25, 1), color 0.2s ease',
        fontSize: `${config.baseSize}rem`,
        whiteSpace: 'nowrap',
        color: `hsl(0, 0%, ${20 + opacity * 50}%)`,
        fontWeight: config.importance > 7 ? 700 : 600,
        textShadow: '0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)',
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
    const words: { text: string; importance: number }[] = [
      // Center (importance 10) - 2 words
      { text: 'AI', importance: 10 },
      { text: 'Design', importance: 10 },

      // Inner ring (importance 9-8) - 6 words
      { text: 'Creative', importance: 9 },
      { text: 'Innovation', importance: 9 },
      { text: 'Strategy', importance: 8 },
      { text: 'Branding', importance: 8 },
      { text: 'UX/UI', importance: 8 },
      { text: 'Vision', importance: 8 },

      // Outer ring (importance 7-6) - 8 words
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

    // Center: 2 words (AI, Design)
    const centerWords = words.slice(0, 2);
    centerWords.forEach((word, i) => {
      const angle = (i / centerWords.length) * Math.PI * 2 - Math.PI / 2;
      const radius = 8;
      configs.push({
        text: word.text,
        importance: word.importance,
        x: 50 + radius * Math.cos(angle),
        y: 50 + radius * Math.sin(angle),
        baseSize: 1.3, // Increased from 1.0
      });
    });

    // Inner ring: 6 words
    const innerRingWords = words.slice(2, 8);
    innerRingWords.forEach((word, i) => {
      const angle = (i / innerRingWords.length) * Math.PI * 2 - Math.PI / 2;
      const radius = 22;
      configs.push({
        text: word.text,
        importance: word.importance,
        x: 50 + radius * Math.cos(angle),
        y: 50 + radius * Math.sin(angle),
        baseSize: 1.1, // Increased from 0.85
      });
    });

    // Outer ring: 8 words
    const outerRingWords = words.slice(8, 16);
    outerRingWords.forEach((word, i) => {
      const angle = (i / outerRingWords.length) * Math.PI * 2 - Math.PI / 2 + Math.PI / 8;
      const radius = 38;
      configs.push({
        text: word.text,
        importance: word.importance,
        x: 50 + radius * Math.cos(angle),
        y: 50 + radius * Math.sin(angle),
        baseSize: 0.95, // Increased from 0.75
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
