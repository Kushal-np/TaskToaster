import { apiClient, AUTH_ENDPOINTS } from '../api';
import type { IAuthResponse, IUser } from '../types';

export const login = async (credentials: { email: string; password: string }): Promise<IAuthResponse> => {
  const { data } = await apiClient.post(AUTH_ENDPOINTS.LOGIN, credentials);
  return data;
};

export const register = async (userInfo: Omit<IUser, '_id' | 'clubIds' | 'createdAt' | 'updatedAt'>): Promise<IAuthResponse> => {
  const { data } = await apiClient.post(AUTH_ENDPOINTS.REGISTER, userInfo);
  return data;
};

export const getMe = async (): Promise<IAuthResponse> => {
  const { data } = await apiClient.get(AUTH_ENDPOINTS.GET_ME);
  return data;
};