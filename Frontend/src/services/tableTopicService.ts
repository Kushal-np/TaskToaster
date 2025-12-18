import { apiClient } from '../api';
import type { ITableTopic } from '../types';

export const getTableTopicsForUser = async (userId: string): Promise<ITableTopic[]> => {
  const { data } = await apiClient.get(`/v1/table-topic/user/${userId}`); // Assuming endpoint
  return data;
};