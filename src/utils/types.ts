import { Request, Response } from 'express';

export interface IUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface IStartup {
  id: number;
  user_id: number;
  name: string;
  url: string;
  location: string;
  stage: string;
  goals: string;
  discount: string;
  created_at: Date;
}

export interface IComment {
  id: number;
  user_id: number;
  startup_id: number;
  content: string;
  created_at: Date;
}

// Additional types can be added here

export interface IRequest extends Request {
  user?: IUser;
}

export interface IResponse extends Response {}