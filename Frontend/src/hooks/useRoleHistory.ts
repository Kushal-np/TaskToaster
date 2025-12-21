// src/hooks/useRoleHistory.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as roleHistoryService from '../services/roleHistoryService';
import { useToast } from './useToast';
import type { IRoleHistory } from '../types';

/**
 * Get role history for a specific user
 */
export const useUserRoleHistory = (userId: string, role?: string) => {
  return useQuery({
    queryKey: ['role-history', 'user', userId, role],
    queryFn: () => roleHistoryService.getUserRoleHistory(userId, role),
    enabled: !!userId,
  });
};

/**
 * Get role history for a specific meeting
 */
export const useMeetingRoleHistory = (meetingId: string) => {
  return useQuery({
    queryKey: ['role-history', 'meeting', meetingId],
    queryFn: () => roleHistoryService.getMeetingRoleHistory(meetingId),
    enabled: !!meetingId,
  });
};

/**
 * Create a new role history entry
 */
export const useCreateRoleHistory = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: roleHistoryService.createRoleHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['role-history'] });
      toast.success('Role history recorded successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to record role history');
    },
  });
};

/**
 * Update an existing role history entry
 */
export const useUpdateRoleHistory = (roleHistoryId: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (data: Partial<IRoleHistory>) => 
      roleHistoryService.updateRoleHistory(roleHistoryId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['role-history'] });
      toast.success('Role history updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update role history');
    },
  });
};

/**
 * Delete a role history entry
 */
export const useDeleteRoleHistory = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (roleHistoryId: string) => roleHistoryService.deleteRoleHistory(roleHistoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['role-history'] });
      toast.success('Role history deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete role history');
    },
  });
};