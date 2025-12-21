// src/services/tableTopicService.ts
import apiClient from '../api/axiosConfig';
import { TABLE_TOPIC_ENDPOINTS } from '../api/endpoints';
import type { ITableTopic } from '../types';

/**
 * Record a new table topic
 */
export const createTableTopic = async (topicData: {
  meetingId: string;
  participantId?: string;
  guestId?: string;
  participantModel?: 'User' | 'Guest';
  participantName: string;
  topic: string;
  duration: string;
  targetDuration?: string;
  rating?: number;
  notes?: string;
}): Promise<ITableTopic> => {
  const response = await apiClient.post(TABLE_TOPIC_ENDPOINTS.CREATE, topicData);
  return response.data.data;
};

/**
 * Get table topics for a specific user
 */
export const getUserTableTopics = async (userId: string): Promise<ITableTopic[]> => {
  const response = await apiClient.get(TABLE_TOPIC_ENDPOINTS.GET_USER_TOPICS(userId));
  return response.data.data;
};

/**
 * Get table topics for a specific meeting
 */
export const getMeetingTableTopics = async (meetingId: string): Promise<ITableTopic[]> => {
  const response = await apiClient.get(TABLE_TOPIC_ENDPOINTS.GET_MEETING_TOPICS(meetingId));
  return response.data.data;
};

/**
 * Update table topic information
 */
export const updateTableTopic = async (
  topicId: string,
  updateData: Partial<{
    topic: string;
    duration: string;
    rating: number;
    notes: string;
  }>
): Promise<ITableTopic> => {
  const response = await apiClient.put(TABLE_TOPIC_ENDPOINTS.UPDATE(topicId), updateData);
  return response.data.data;
};

/**
 * Delete a table topic record
 */
export const deleteTableTopic = async (topicId: string): Promise<{ success: boolean; message: string }> => {
  const response = await apiClient.delete(TABLE_TOPIC_ENDPOINTS.DELETE(topicId));
  return response.data;
};