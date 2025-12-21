// src/hooks/useTableTopics.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as tableTopicService from '../services/tableTopicService';
import { useToast } from './useToast';
import type { ITableTopic } from '../types';

/**
 * Get table topics for a specific user
 */
export const useUserTableTopics = (userId: string) => {
  return useQuery({
    queryKey: ['table-topics', 'user', userId],
    queryFn: () => tableTopicService.getUserTableTopics(userId),
    enabled: !!userId,
  });
};

/**
 * Get table topics for a specific meeting
 */
export const useMeetingTableTopics = (meetingId: string) => {
  return useQuery({
    queryKey: ['table-topics', 'meeting', meetingId],
    queryFn: () => tableTopicService.getMeetingTableTopics(meetingId),
    enabled: !!meetingId,
  });
};

/**
 * Create a new table topic record
 */
export const useCreateTableTopic = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: tableTopicService.createTableTopic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['table-topics'] });
      toast.success('Table topic recorded successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to record table topic');
    },
  });
};

/**
 * Update an existing table topic
 */
export const useUpdateTableTopic = (topicId: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (data: Partial<ITableTopic>) => 
      tableTopicService.updateTableTopic(topicId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['table-topics'] });
      toast.success('Table topic updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update table topic');
    },
  });
};

/**
 * Delete a table topic record
 */
export const useDeleteTableTopic = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (topicId: string) => tableTopicService.deleteTableTopic(topicId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['table-topics'] });
      toast.success('Table topic deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete table topic');
    },
  });
};