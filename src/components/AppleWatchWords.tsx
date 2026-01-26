import { useState, useEffect, useRef } from 'react';

interface WordProps {
  word: string;
  mousePosition: { x: number; y: number };
  containerRef: React.RefObject<HTMLDivElement>;
}

const Word = ({ word, mousePosition, containerRef }: WordProps) => {
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
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [containerRef]);

  const calculateScale = () => {
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - wordPosition.x, 2) +
      Math.pow(mousePosition.y - wordPosition.y, 2)
    );

    const maxDistance = 150;
    const minScale = 0.8;
    const maxScale = 2.5;

    if (distance > maxDistance) return minScale;

    const scale = maxScale - (distance / maxDistance) * (maxScale - minScale);
    return scale;
  };

  const scale = calculateScale();

  return (
    <div
      ref={wordRef}
      className="flex items-center justify-center text-foreground font-semibold cursor-pointer select-none hover:text-primary transition-colors"
      style={{
        transform: `scale(${scale})`,
        transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
        fontSize: '0.875rem',
        whiteSpace: 'nowrap',
        zIndex: Math.round(scale * 10)
      }}
    >
      {word}
    </div>
  );
};

const AppleWatchWords = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const words = [
    'AI', 'Design', 'Creativity', 'Innovation',
    'Automation', 'Strategy', 'Branding', 'Digital',
    'Future', 'Smart', 'Data', 'Analytics',
    'UX/UI', 'Web', 'Mobile', 'Cloud',
    'Tech', 'Growth', 'Marketing', 'Solutions',
    'Vision', 'Transform', 'Modern', 'Dynamic'
  ];

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
      className="relative w-full h-full flex items-center justify-center p-8"
      style={{ minHeight: '400px' }}
    >
      <div
        className="grid grid-cols-4 gap-4 md:gap-6 w-full max-w-lg"
        style={{
          placeItems: 'center',
          perspective: '1000px'
        }}
      >
        {words.map((word, index) => (
          <Word
            key={index}
            word={word}
            mousePosition={mousePosition}
            containerRef={containerRef}
          />
        ))}
      </div>
    </div>
  );
};

export default AppleWatchWords;
