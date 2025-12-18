import { apiClient } from '../api';
import type { ISpeech } from '../types';

export const getSpeechesForUser = async (userId: string): Promise<ISpeech[]> => {
  const { data } = await apiClient.get(`/v1/speech/user/${userId}`); // Assuming endpoint
  return data;
};