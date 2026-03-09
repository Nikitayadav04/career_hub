export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  bio?: string;
  skills?: string;
  experience?: string;
  education?: string;
  avatar?: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  requirements: string;
  posted_at: string;
  logo: string;
}

export interface Application {
  id: number;
  user_id: number;
  job_id: number;
  status: string;
  applied_at: string;
  title: string;
  company: string;
  location: string;
}

export interface Connection {
  id: number;
  user_id: number;
  connection_id: number;
  status: string;
  created_at: string;
  name?: string;
  avatar?: string;
  bio?: string;
}
