import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AuthRequest } from '../types';
import { parsePrompt } from '../services/promptParser';
import { createJob, updateJob } from '../services/jobStore';
import { renderComposition } from '../services/renderer';

export async function handleRender(req: AuthRequest, res: Response): Promise<void> {
  const { prompt, projectId: _projectId } = req.body;

  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    res.status(400).json({ error: 'Prompt is required.' });
    return;
  }

  const parsed = parsePrompt(prompt.trim());
  const jobId  = uuidv4();

  createJob(jobId, req.userId!, parsed.template);

  // Respond immediately; render runs in the background
  res.status(202).json({ jobId, template: parsed.template, status: 'queued' });

  // Fire-and-forget background render
  setImmediate(async () => {
    updateJob(jobId, { status: 'rendering', progress: 0 });
    try {
      const result = await renderComposition(
        jobId,
        parsed.compositionId,
        parsed.inputProps,
        (progress) => updateJob(jobId, { progress }),
      );
      updateJob(jobId, { status: 'done', progress: 100, outputUrl: result.outputUrl });
    } catch (err) {
      console.error(`[render] Job ${jobId} failed:`, (err as Error).message);
      updateJob(jobId, { status: 'failed', error: (err as Error).message });
    }
  });
}
