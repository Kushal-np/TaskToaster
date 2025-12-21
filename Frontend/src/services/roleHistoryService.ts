// src/services/roleHistoryService.ts
import apiClient from '../api/axiosConfig';
import { ROLE_HISTORY_ENDPOINTS } from '../api/endpoints';
import type { IRoleHistory } from '../types';

/**
 * Record a new role history entry
 */
export const createRoleHistory = async (roleData: {
  userId?: string;
  guestId?: string;
  userModel?: 'User' | 'Guest';
  participantName: string;
  meetingId: string;
  role: string;
  feedback?: string;
  rating?: number;
}): Promise<IRoleHistory> => {
  const response = await apiClient.post(ROLE_HISTORY_ENDPOINTS.CREATE, roleData);
  return response.data.data;
};

/**
 * Get role history for a specific user
 */
export const getUserRoleHistory = async (
  userId: string,
  role?: string
): Promise<{
  data: IRoleHistory[];
  stats: {
    totalRoles: number;
    roleBreakdown: Record<string, number>;
    averageRating: number;
  };
}> => {
  const params = role ? { role } : undefined;
  const response = await apiClient.get(ROLE_HISTORY_ENDPOINTS.GET_USER_HISTORY(userId), { params });
  return {
    data: response.data.data,
    stats: response.data.stats,
  };
};

/**
 * Get role history for a specific meeting
 */
export const getMeetingRoleHistory = async (meetingId: string): Promise<IRoleHistory[]> => {
  const response = await apiClient.get(ROLE_HISTORY_ENDPOINTS.GET_MEETING_HISTORY(meetingId));
  return response.data.data;
};

/**
 * Update role history entry
 */
export const updateRoleHistory = async (
  roleHistoryId: string,
  updateData: Partial<{
    feedback: string;
    rating: number;
  }>
): Promise<IRoleHistory> => {
  const response = await apiClient.put(ROLE_HISTORY_ENDPOINTS.UPDATE(roleHistoryId), updateData);
  return response.data.data;
};

/**
 * Delete a role history entry
 */
export const deleteRoleHistory = async (roleHistoryId: string): Promise<{ success: boolean; message: string }> => {
  const response = await apiClient.delete(ROLE_HISTORY_ENDPOINTS.DELETE(roleHistoryId));
  return response.data;
};