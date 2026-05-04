import { Request } from 'express';

export interface AuthRequest extends Request {
  userId?: number;
}

export interface User {
  id: number;
  email: string;
  password_hash: string;
  created_at: Date;
}

export interface Project {
  id: number;
  user_id: number;
  title: string;
  prompt: string;
  created_at: Date;
}
