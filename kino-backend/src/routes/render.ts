import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AuthRequest } from '../types';
import { parsePrompt } from '../services/promptParser';
import { renderQueue } from '../services/queue';

export async function handleRender(req: AuthRequest, res: Response): Promise<void> {
  const { prompt, projectId } = req.body;

  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    res.status(400).json({ error: 'Prompt is required.' });
    return;
  }

  const parsed  = parsePrompt(prompt.trim());
  const jobId   = uuidv4();

  try {
    await renderQueue.add(
      'render',
      {
        jobId,
        userId:    req.userId!,
        projectId: projectId ?? null,
        compositionId: parsed.compositionId,
        template:      parsed.template,
        inputProps:    parsed.inputProps,
      },
      { jobId }
    );

    res.status(202).json({
      jobId,
      template: parsed.template,
      status:   'queued',
    });
  } catch (err) {
    console.error('Render enqueue error:', err);
    res.status(500).json({ error: 'Failed to queue render job.' });
  }
}
