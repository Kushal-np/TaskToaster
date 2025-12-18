import { apiClient } from '../api';
import type { IGuest } from '../types';

export const addGuest = async (guestData: Omit<IGuest, '_id' | 'createdAt' | 'updatedAt'>): Promise<IGuest> => {
  const { data } = await apiClient.post('/v1/guest/create', guestData); // Assuming endpoint
  return data;
};