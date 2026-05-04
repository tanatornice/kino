import { Queue, Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import { renderComposition } from './renderer';
import { Template, TemplateParams } from './promptParser';

export interface RenderJobData {
  jobId: string;
  userId: number;
  projectId: number | null;
  compositionId: 'TextStagger' | 'LogoReveal' | 'ChartBuild';
  template: Template;
  inputProps: TemplateParams;
}

export interface RenderJobResult {
  outputUrl: string;
}

function makeConnection() {
  return new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: null,
  });
}

export const renderQueue = new Queue<RenderJobData, RenderJobResult>('renders', {
  connection: makeConnection(),
});

// Worker runs in the same process for MVP; in production, split into a separate service
const worker = new Worker<RenderJobData, RenderJobResult>(
  'renders',
  async (job: Job<RenderJobData, RenderJobResult>) => {
    const { jobId, compositionId, inputProps } = job.data;

    const result = await renderComposition(
      jobId,
      compositionId,
      inputProps,
      async (progress) => {
        await job.updateProgress(progress);
      }
    );

    return { outputUrl: result.outputUrl };
  },
  {
    connection: makeConnection(),
    concurrency: 1,
  }
);

worker.on('completed', (job) => {
  console.log(`[queue] Job ${job.id} complete → ${job.returnvalue?.outputUrl}`);
});

worker.on('failed', (job, err) => {
  console.error(`[queue] Job ${job?.id} failed:`, err.message);
});

export { worker };
