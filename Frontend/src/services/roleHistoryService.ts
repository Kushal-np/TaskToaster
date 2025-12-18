import { apiClient } from '../api';
import type { IRoleHistory } from '../types';

export const getRoleHistoryForUser = async (userId: string): Promise<IRoleHistory[]> => {
  const { data } = await apiClient.get(`/v1/role-history/user/${userId}`); // Assuming endpoint
  return data;
};