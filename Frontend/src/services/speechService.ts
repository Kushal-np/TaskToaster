// src/services/speechService.ts
import apiClient from '../api/axiosConfig';
import { SPEECH_ENDPOINTS } from '../api/endpoints';
import type { ISpeech } from '../types';

/**
 * Record a new speech
 */
export const createSpeech = async (speechData: {
  speakerId: string;
  speakerModel?: 'User' | 'Guest';
  speakerName: string;
  meetingId: string;
  title: string;
  speechType?: 'prepared' | 'evaluation' | 'icebreaker';
  pathwaysProject?: {
    level: string;
    pathway: string;
    projectName: string;
  };
  objectives?: string[];
  duration: string;
  targetDuration: string;
  evaluatorId?: string;
  evaluatorFeedback?: string;
  evaluatorRating?: number;
}): Promise<ISpeech> => {
  const response = await apiClient.post(SPEECH_ENDPOINTS.CREATE, speechData);
  return response.data.data;
};

/**
 * Get all speeches for a specific user
 */
export const getUserSpeeches = async (userId: string): Promise<ISpeech[]> => {
  const response = await apiClient.get(SPEECH_ENDPOINTS.GET_USER_SPEECHES(userId));
  return response.data.data;
};

/**
 * Get all speeches for a specific meeting
 */
export const getMeetingSpeeches = async (meetingId: string): Promise<ISpeech[]> => {
  const response = await apiClient.get(SPEECH_ENDPOINTS.GET_MEETING_SPEECHES(meetingId));
  return response.data.data;
};

/**
 * Update speech information
 */
export const updateSpeech = async (
  speechId: string,
  updateData: Partial<{
    title: string;
    duration: string;
    evaluatorFeedback: string;
    evaluatorRating: number;
  }>
): Promise<ISpeech> => {
  const response = await apiClient.put(SPEECH_ENDPOINTS.UPDATE(speechId), updateData);
  return response.data.data;
};

/**
 * Delete a speech record
 */
export const deleteSpeech = async (speechId: string): Promise<{ success: boolean; message: string }> => {
  const response = await apiClient.delete(SPEECH_ENDPOINTS.DELETE(speechId));
  return response.data;
};