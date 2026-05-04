const BASE_URL =
  import.meta.env.VITE_API_URL ??
  import.meta.env.PUBLIC_API_URL ??
  'https://kino-1-etig.onrender.com';

export interface ApiError {
  error: string;
}

export interface AuthResponse {
  token: string;
  user: { id: number; email: string; created_at: string };
}

export interface Project {
  id: number;
  user_id: number;
  title: string;
  prompt: string;
  created_at: string;
}

export interface RenderJob {
  jobId: string;
  template: string;
  status: 'queued' | 'rendering' | 'done' | 'failed';
  progress: number;
  outputUrl?: string;
  error?: string;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('kino_token');

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  const data = await res.json().catch(() => ({ error: 'No response body.' }));

  if (!res.ok) {
    throw new Error((data as ApiError).error ?? `Request failed (${res.status}).`);
  }

  return data as T;
}

// Auth
export const api = {
  signup(email: string, password: string) {
    return request<AuthResponse>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  login(email: string, password: string) {
    return request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Projects
  createProject(title: string, prompt: string) {
    return request<Project>('/api/projects', {
      method: 'POST',
      body: JSON.stringify({ title, prompt }),
    });
  },

  listProjects() {
    return request<Project[]>('/api/projects');
  },

  deleteProject(id: number) {
    return request<void>(`/api/projects/${id}`, { method: 'DELETE' });
  },

  // Rendering
  submitRender(prompt: string, projectId?: number) {
    return request<{ jobId: string; template: string; status: string }>('/api/render', {
      method: 'POST',
      body: JSON.stringify({ prompt, projectId }),
    });
  },

  getJob(jobId: string) {
    return request<RenderJob>(`/api/jobs/${jobId}`);
  },
};

// Auth helpers
export function saveToken(token: string) {
  localStorage.setItem('kino_token', token);
}

export function clearToken() {
  localStorage.removeItem('kino_token');
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem('kino_token');
}
