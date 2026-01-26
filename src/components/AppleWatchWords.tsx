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
    <div className="w-full h-full flex items-center justify-start">
      <div className="flex items-center gap-3 flex-wrap">
        <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground whitespace-nowrap">
          We deliver
        </p>

        <div className="relative inline-block" style={{
          height: '48px',
          overflow: 'hidden',
          minWidth: '200px',
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
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary block"
                style={{
                  height: '48px',
                  lineHeight: '48px',
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
            transform: translateY(-48px);
          }
          18% {
            transform: translateY(-96px);
          }
          27% {
            transform: translateY(-144px);
          }
          36% {
            transform: translateY(-192px);
          }
          45% {
            transform: translateY(-240px);
          }
          54% {
            transform: translateY(-288px);
          }
          63% {
            transform: translateY(-336px);
          }
          72% {
            transform: translateY(-384px);
          }
          81% {
            transform: translateY(-432px);
          }
          90% {
            transform: translateY(-480px);
          }
          100% {
            transform: translateY(-480px);
          }
        }
      `}</style>
    </div>
  );
};

export default AppleWatchWords;
