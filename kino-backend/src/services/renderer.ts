import path from 'path';
import fs from 'fs';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { TemplateParams } from './promptParser';

const RENDERS_DIR = path.resolve(process.cwd(), 'renders');
const ENTRY_POINT  = path.resolve(__dirname, '../remotion/index.ts');

// Bundle is compiled once and reused across all render jobs
let cachedBundle: string | null = null;

async function getBundle(): Promise<string> {
  if (cachedBundle) return cachedBundle;
  console.log('[renderer] Bundling Remotion compositions…');
  cachedBundle = await bundle({ entryPoint: ENTRY_POINT });
  console.log('[renderer] Bundle ready.');
  return cachedBundle;
}

export interface RenderResult {
  outputPath: string;
  outputUrl: string;
}

export async function renderComposition(
  jobId: string,
  compositionId: 'TextStagger' | 'LogoReveal' | 'ChartBuild',
  inputProps: TemplateParams,
  onProgress: (progress: number) => void
): Promise<RenderResult> {
  if (!fs.existsSync(RENDERS_DIR)) {
    fs.mkdirSync(RENDERS_DIR, { recursive: true });
  }

  const serveUrl  = await getBundle();
  const outputPath = path.join(RENDERS_DIR, `${jobId}.mp4`);

  const composition = await selectComposition({
    serveUrl,
    id: compositionId,
    inputProps,
  });

  await renderMedia({
    composition,
    serveUrl,
    codec: 'h264',
    outputLocation: outputPath,
    inputProps,
    onProgress: ({ progress }) => {
      onProgress(Math.round(progress * 100));
    },
  });

  return {
    outputPath,
    outputUrl: `/renders/${jobId}.mp4`,
  };
}
