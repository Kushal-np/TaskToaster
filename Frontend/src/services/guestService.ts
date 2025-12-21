// src/services/guestService.ts
import apiClient from '../api/axiosConfig';
import { GUEST_ENDPOINTS } from '../api/endpoints';
import type { IGuest } from '../types';

/**
 * Create a new guest
 */
export const createGuest = async (guestData: {
  name: string;
  email?: string;
  phone?: string;
  isToastmaster?: boolean;
  homeClubNumber?: string;
  homeClubName?: string;
}): Promise<IGuest> => {
  const response = await apiClient.post(GUEST_ENDPOINTS.CREATE, guestData);
  return response.data.data;
};

/**
 * Get all guests with optional filters
 */
export const getGuests = async (params?: {
  search?: string;
  isToastmaster?: boolean;
}): Promise<IGuest[]> => {
  const response = await apiClient.get(GUEST_ENDPOINTS.GET_ALL, { params });
  return response.data.data;
};

/**
 * Get a single guest by ID
 */
export const getGuestById = async (guestId: string): Promise<IGuest> => {
  const response = await apiClient.get(GUEST_ENDPOINTS.GET_BY_ID(guestId));
  return response.data.data;
};

/**
 * Update guest information
 */
export const updateGuest = async (
  guestId: string,
  updateData: Partial<{
    name: string;
    email?: string;
    phone?: string;
    isToastmaster?: boolean;
    homeClubNumber?: string;
    homeClubName?: string;
  }>
): Promise<IGuest> => {
  const response = await apiClient.put(GUEST_ENDPOINTS.UPDATE(guestId), updateData);
  return response.data.data;
};

/**
 * Delete a guest
 */
export const deleteGuest = async (guestId: string): Promise<{ success: boolean; message: string }> => {
  const response = await apiClient.delete(GUEST_ENDPOINTS.DELETE(guestId));
  return response.data;
};