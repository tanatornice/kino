import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';

interface Props extends Record<string, unknown> {
  label: string;
  color: string;
  background: string;
}

// Pattern C from design system: SVG line drawing via stroke-dashoffset, inOut(3) ease
// Three geometric paths make up the mark; each draws in staggered by 80ms
export const LogoReveal: React.FC<Props> = ({ label, color, background }) => {
  const frame = useCurrentFrame();
  const FPS = 24;

  // 1200ms total, 80ms stagger (Pattern C values)
  const durationFrames = (1200 / 1000) * FPS;  // 28.8
  const staggerFrames  = (80   / 1000) * FPS;  // 1.92 per path

  // Diamond mark: four equal sides, each 283px (200√2), total perimeter ≈ 1131
  const PATHS = [
    { d: 'M 540 700 L 740 900', len: 283 },
    { d: 'M 740 900 L 540 1100', len: 283 },
    { d: 'M 540 1100 L 340 900', len: 283 },
    { d: 'M 340 900 L 540 700', len: 283 },
  ];

  // Label fades in once the mark finishes drawing
  const labelDelay  = (PATHS.length - 1) * staggerFrames + durationFrames;
  const labelOpacity = interpolate(frame, [labelDelay, labelDelay + 12], [0, 1], {
    extrapolateLeft:  'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ background, justifyContent: 'center', alignItems: 'center' }}>
      <svg
        width={1080}
        height={1920}
        viewBox="0 0 1080 1920"
        style={{ position: 'absolute', inset: 0 }}
      >
        {PATHS.map(({ d, len }, i) => {
          const start = i * staggerFrames;
          const end   = start + durationFrames;

          // inOut(3) ≈ cubic-bezier easeInOut — matches design system 'inOut(3)' token
          const progress = interpolate(frame, [start, end], [0, 1], {
            extrapolateLeft:  'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.cubic),
          });

          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={color}
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray={len}
              strokeDashoffset={len * (1 - progress)}
            />
          );
        })}

        {/* Label appears after mark is drawn */}
        <text
          x={540}
          y={1160}
          textAnchor="middle"
          fontSize={96}
          fontWeight={700}
          fontFamily='"Inter", "Helvetica Neue", sans-serif'
          letterSpacing="-2"
          fill={color}
          opacity={labelOpacity}
        >
          {label}
        </text>
      </svg>
    </AbsoluteFill>
  );
};
