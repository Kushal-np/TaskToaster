// src/hooks/useGuests.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as guestService from '../services/guestService';
import { useToast } from './useToast';
import type { IGuest } from '../types';

/**
 * Get all guests with optional filters
 */
export const useGuests = (params?: { search?: string; isToastmaster?: boolean }) => {
  return useQuery({
    queryKey: ['guests', params],
    queryFn: () => guestService.getGuests(params),
  });
};

/**
 * Get a single guest by ID
 */
export const useGuest = (guestId: string) => {
  return useQuery({
    queryKey: ['guest', guestId],
    queryFn: () => guestService.getGuestById(guestId),
    enabled: !!guestId,
  });
};

/**
 * Create a new guest
 */
export const useCreateGuest = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: guestService.createGuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests'] });
      toast.success('Guest added successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add guest');
    },
  });
};

/**
 * Update an existing guest
 */
export const useUpdateGuest = (guestId: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (data: Partial<IGuest>) => guestService.updateGuest(guestId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guest', guestId] });
      queryClient.invalidateQueries({ queryKey: ['guests'] });
      toast.success('Guest updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update guest');
    },
  });
};

/**
 * Delete a guest
 */
export const useDeleteGuest = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (guestId: string) => guestService.deleteGuest(guestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests'] });
      toast.success('Guest deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete guest');
    },
  });
};