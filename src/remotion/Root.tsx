import { Composition } from 'remotion';
import { TextStagger } from './compositions/TextStagger';
import { LogoReveal }  from './compositions/LogoReveal';
import { ChartBuild }  from './compositions/ChartBuild';

// All compositions run at 24fps, 1080×1920 (vertical/social format)
// 60 frames = 2.5s: animation + ~1s hold at end
const FPS = 24;
const W   = 1080;
const H   = 1920;
const DUR = 60;

export const Root: React.FC = () => (
  <>
    <Composition
      id="TextStagger"
      component={TextStagger}
      fps={FPS} width={W} height={H} durationInFrames={DUR}
      defaultProps={{ text: 'KINO', color: '#ffffff', background: '#0a0a0a' }}
    />
    <Composition
      id="LogoReveal"
      component={LogoReveal}
      fps={FPS} width={W} height={H} durationInFrames={DUR}
      defaultProps={{ label: 'KINO', color: '#ffffff', background: '#0a0a0a' }}
    />
    <Composition
      id="ChartBuild"
      component={ChartBuild}
      fps={FPS} width={W} height={H} durationInFrames={DUR}
      defaultProps={{ data: [65, 80, 45, 90, 70], color: '#ffffff', background: '#0a0a0a' }}
    />
  </>
);
