// src/types/index.ts
export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password:string;
  clubIds: string[];
  role: 'user' | 'admin' | 'superadmin';
  createdAt: string;
  updatedAt: string;
}

export interface IRegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: 'user' | 'admin' | 'superadmin';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  message: string;
  // No token field needed for cookie-based auth
}