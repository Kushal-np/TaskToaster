// src/hooks/useSpeeches.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as speechService from '../services/speechService';
import { useToast } from './useToast';
import type { ISpeech } from '../types';

/**
 * Get speeches for a specific user
 */
export const useUserSpeeches = (userId: string) => {
  return useQuery({
    queryKey: ['speeches', 'user', userId],
    queryFn: () => speechService.getUserSpeeches(userId),
    enabled: !!userId,
  });
};

/**
 * Get speeches for a specific meeting
 */
export const useMeetingSpeeches = (meetingId: string) => {
  return useQuery({
    queryKey: ['speeches', 'meeting', meetingId],
    queryFn: () => speechService.getMeetingSpeeches(meetingId),
    enabled: !!meetingId,
  });
};

/**
 * Create a new speech record
 */
export const useCreateSpeech = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: speechService.createSpeech,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['speeches'] });
      toast.success('Speech recorded successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to record speech');
    },
  });
};

/**
 * Update an existing speech
 */
export const useUpdateSpeech = (speechId: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (data: Partial<ISpeech>) => speechService.updateSpeech(speechId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['speeches'] });
      toast.success('Speech updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update speech');
    },
  });
};

/**
 * Delete a speech record
 */
export const useDeleteSpeech = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (speechId: string) => speechService.deleteSpeech(speechId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['speeches'] });
      toast.success('Speech deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete speech');
    },
  });
};