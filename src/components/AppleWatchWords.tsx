import { useState, useEffect, useRef, useMemo } from 'react';

interface WordConfig {
  text: string;
  importance: number;
  row: number;
  col: number;
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

    // Apple Watch style magnification
    const maxDistance = 120;
    const minScale = 0.85;
    const maxScale = 1.8;

    if (distance > maxDistance) return minScale;

    // Smooth curve for magnification
    const normalizedDistance = distance / maxDistance;
    const scale = maxScale - (Math.pow(normalizedDistance, 1.5) * (maxScale - minScale));
    return scale;
  };

  const scale = calculateScale();

  // Calculate opacity based on importance
  const opacity = 0.5 + (config.importance / 10) * 0.5; // 0.5 to 1.0

  return (
    <div
      ref={wordRef}
      className="flex items-center justify-center font-semibold cursor-pointer select-none hover:text-primary"
      style={{
        transform: `scale(${scale})`,
        transition: 'transform 0.25s cubic-bezier(0.2, 0, 0.2, 1), color 0.2s ease',
        fontSize: `${config.baseSize}rem`,
        whiteSpace: 'nowrap',
        color: `hsl(0, 0%, ${20 + opacity * 50}%)`,
        fontWeight: config.importance > 7 ? 700 : 600,
      }}
    >
      {config.text}
    </div>
  );
};

const AppleWatchWords = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const wordConfigs = useMemo(() => {
    const words: { text: string; importance: number }[] = [
      { text: 'AI', importance: 10 },
      { text: 'Design', importance: 10 },
      { text: 'Creative', importance: 9 },
      { text: 'Innovation', importance: 9 },
      { text: 'Strategy', importance: 8 },
      { text: 'Branding', importance: 8 },
      { text: 'UX/UI', importance: 8 },
      { text: 'Digital', importance: 7 },
      { text: 'Smart', importance: 7 },
      { text: 'Data', importance: 7 },
      { text: 'Growth', importance: 7 },
      { text: 'Web', importance: 6 },
      { text: 'Mobile', importance: 6 },
      { text: 'Cloud', importance: 6 },
      { text: 'Tech', importance: 6 },
    ];

    // Create honeycomb-like grid layout
    const configs: WordConfig[] = [];
    const cols = 4;

    words.forEach((word, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      // Base size based on importance
      const baseSize = 0.7 + (word.importance / 10) * 0.4; // 0.7rem to 1.1rem

      configs.push({
        text: word.text,
        importance: word.importance,
        row,
        col,
        baseSize
      });
    });

    return configs;
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
      className="relative w-full h-full flex items-center justify-center p-6"
      style={{ minHeight: '400px' }}
    >
      <div
        className="grid gap-x-6 gap-y-8"
        style={{
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          placeItems: 'center',
          width: '90%',
          maxWidth: '450px'
        }}
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
