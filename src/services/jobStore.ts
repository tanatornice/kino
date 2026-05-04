export interface JobRecord {
  jobId: string;
  userId: number;
  template: string;
  status: 'queued' | 'rendering' | 'done' | 'failed';
  progress: number;
  outputUrl?: string;
  error?: string;
}

const store = new Map<string, JobRecord>();

export function createJob(jobId: string, userId: number, template: string): JobRecord {
  const record: JobRecord = { jobId, userId, template, status: 'queued', progress: 0 };
  store.set(jobId, record);
  return record;
}

export function getJob(jobId: string): JobRecord | undefined {
  return store.get(jobId);
}

export function updateJob(jobId: string, updates: Partial<Omit<JobRecord, 'jobId'>>): void {
  const record = store.get(jobId);
  if (record) Object.assign(record, updates);
}
