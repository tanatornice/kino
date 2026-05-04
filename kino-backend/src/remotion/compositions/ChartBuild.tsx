import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';

interface Props extends Record<string, unknown> {
  data: number[];
  color: string;
  background: string;
}

// Chart bars scale up from baseline with stagger — out(3) ease, 600ms duration, 80ms stagger
export const ChartBuild: React.FC<Props> = ({ data, color, background }) => {
  const frame = useCurrentFrame();
  const FPS = 24;

  const durationFrames = (600 / 1000) * FPS;  // 14.4
  const staggerFrames  = (80  / 1000) * FPS;  // 1.92 per bar

  const W = 1080;
  const H = 1920;
  const chartH = 800;
  const chartY = H / 2 + 100;
  const barCount = data.length;
  const gap = 32;
  const barW = (W - 120 - gap * (barCount - 1)) / barCount;

  return (
    <AbsoluteFill style={{ background }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {/* Baseline */}
        <line
          x1={60}
          y1={chartY}
          x2={W - 60}
          y2={chartY}
          stroke={color}
          strokeWidth={1}
          opacity={0.2}
        />

        {data.map((value, i) => {
          const start = i * staggerFrames;
          const end   = start + durationFrames;

          // out(3) easing matches design system 'out(3)' default token
          const scaleY = interpolate(frame, [start, end], [0, 1], {
            extrapolateLeft:  'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          });

          const barH   = (value / 100) * chartH * scaleY;
          const x      = 60 + i * (barW + gap);
          const y      = chartY - barH;

          // Label fades in with the bar
          const opacity = interpolate(frame, [start, end], [0, 1], {
            extrapolateLeft:  'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={barH}
                fill={color}
                rx={4}
              />
              <text
                x={x + barW / 2}
                y={chartY + 48}
                textAnchor="middle"
                fontSize={40}
                fontFamily='"Inter", "Helvetica Neue", sans-serif'
                fill={color}
                opacity={opacity * 0.5}
              >
                {value}
              </text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
