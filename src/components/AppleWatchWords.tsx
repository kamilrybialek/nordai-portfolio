import { useEffect, useState } from 'react';

const AppleWatchWords = () => {
  const [bgColor, setBgColor] = useState('#ffffff');

  useEffect(() => {
    // Get the actual background color from the page
    const rootStyles = getComputedStyle(document.documentElement);
    const bg = rootStyles.getPropertyValue('--background') || '#ffffff';
    setBgColor(bg.trim());
  }, []);

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
    'AI', // Repeat first word for seamless loop
  ];

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ minHeight: '400px' }}>
      <div className="flex items-center gap-4 flex-nowrap">
        <p className="text-4xl md:text-5xl font-bold text-primary whitespace-nowrap">
          We deliver
        </p>

        <div className="relative" style={{
          height: '60px',
          overflow: 'hidden',
          minWidth: '250px',
        }}>
          {/* Gradient mask overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `linear-gradient(
                to bottom,
                hsl(var(--background)) 0%,
                transparent 25%,
                transparent 75%,
                hsl(var(--background)) 100%
              )`,
            }}
          />

          {/* Animated words */}
          <div
            className="flex flex-col"
            style={{
              animation: 'slideWords 15s infinite',
            }}
          >
            {words.map((word, index) => (
              <span
                key={index}
                className="text-4xl md:text-5xl font-bold text-muted-foreground block"
                style={{
                  height: '60px',
                  lineHeight: '60px',
                  paddingLeft: '0.5rem',
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Keyframes animation */}
      <style>{`
        @keyframes slideWords {
          0% {
            transform: translateY(0);
          }
          9% {
            transform: translateY(-60px);
          }
          18% {
            transform: translateY(-120px);
          }
          27% {
            transform: translateY(-180px);
          }
          36% {
            transform: translateY(-240px);
          }
          45% {
            transform: translateY(-300px);
          }
          54% {
            transform: translateY(-360px);
          }
          63% {
            transform: translateY(-420px);
          }
          72% {
            transform: translateY(-480px);
          }
          81% {
            transform: translateY(-540px);
          }
          90% {
            transform: translateY(-600px);
          }
          100% {
            transform: translateY(-600px);
          }
        }
      `}</style>
    </div>
  );
};

export default AppleWatchWords;
