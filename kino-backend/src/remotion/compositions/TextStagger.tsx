import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';

interface Props extends Record<string, unknown> {
  text: string;
  color: string;
  background: string;
}

// Pattern A from design system: chars rise from overflow:hidden parent, outExpo ease, 60ms stagger
export const TextStagger: React.FC<Props> = ({ text, color, background }) => {
  const frame = useCurrentFrame();
  const FPS = 24;

  // 720ms duration, 60ms stagger (same values as Pattern A)
  const durationFrames = (720 / 1000) * FPS;   // 17.28
  const staggerFrames  = (60  / 1000) * FPS;   // 1.44 per char

  const chars = text.split('');

  return (
    <AbsoluteFill
      style={{
        background,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: '"Inter", "Helvetica Neue", sans-serif',
      }}
    >
      {/* Word container — overflow:hidden is what makes the chars appear to rise from the line */}
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        {chars.map((char, i) => {
          const start = i * staggerFrames;
          const end   = start + durationFrames;

          // outExpo easing matches design system 'outExpo' token
          const y = interpolate(frame, [start, end], [110, 0], {
            extrapolateLeft:  'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.exp),
          });

          return (
            <div key={i} style={{ overflow: 'hidden' }}>
              <span
                style={{
                  display: 'inline-block',
                  transform: `translateY(${y}%)`,
                  fontSize: 160,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color,
                  whiteSpace: 'pre',
                }}
              >
                {char}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
