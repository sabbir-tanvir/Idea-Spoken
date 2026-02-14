// Auth Types

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'STUDENT';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
  error?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'STUDENT' | 'ADMIN';
}

export interface ActionResult {
  success: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    password?: string[];
    general?: string[];
  };
}
