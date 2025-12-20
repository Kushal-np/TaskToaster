// src/services/authService.ts
import axios from 'axios';
import { API_BASE_URL, AUTH_ENDPOINTS } from '../api/endpoints';
import type { IUser, IRegisterRequest, IAuthResponse, LoginCredentials } from '../types';

// Create axios instance with credentials for cookies
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // IMPORTANT: This sends cookies with requests
});

// No need for token interceptor since cookies are http-only
// Remove any Authorization header setting

export const loginUser = async (credentials: LoginCredentials): Promise<IAuthResponse> => {
  try {
    const response = await api.post<IAuthResponse>(AUTH_ENDPOINTS.LOGIN, credentials);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Login failed');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

export const registerUser = async (userData: IRegisterRequest): Promise<IAuthResponse> => {
  try {
    const response = await api.post<IAuthResponse>(AUTH_ENDPOINTS.REGISTER, userData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Registration failed');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

export const logoutUser = async (): Promise<{ message: string }> => {
  try {
    const response = await api.post<{ message: string }>(AUTH_ENDPOINTS.LOGOUT);
    return response.data;
  } catch (error: any) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getMe = async (): Promise<{ user: IUser }> => {
  try {
    const response = await api.get<{ user: IUser }>(AUTH_ENDPOINTS.GET_ME);
    return response.data;
  } catch (error: any) {
    console.error('GetMe error:', error);
    throw error;
  }
};

export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  try {
    const response = await api.post<{ message: string }>('/auth/forgot-password', { email });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to send reset link');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};