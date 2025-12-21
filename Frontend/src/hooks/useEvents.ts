// src/hooks/useEvents.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as eventService from '../services/eventService';
import { useToast } from './useToast';
import type { ICreateEventRequest } from '../types';

/**
 * Get a single event by ID
 */
export const useEvent = (eventId: string) => {
  return useQuery({
    queryKey: ['event', eventId],
    queryFn: () => eventService.getEventById(eventId),
    enabled: !!eventId,
  });
};

/**
 * Get all events for a club
 */
export const useClubEvents = (clubId: string, upcoming?: boolean, eventType?: string) => {
  return useQuery({
    queryKey: ['club-events', clubId, upcoming, eventType],
    queryFn: () => eventService.getClubEvents(clubId, upcoming, eventType),
    enabled: !!clubId,
  });
};

/**
 * Create a new event
 */
export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (data: ICreateEventRequest) => eventService.createEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['club-events'] });
      toast.success('Event created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create event');
    },
  });
};

/**
 * Update an existing event
 */
export const useUpdateEvent = (eventId: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (data: Partial<ICreateEventRequest>) => 
      eventService.updateEvent(eventId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event', eventId] });
      queryClient.invalidateQueries({ queryKey: ['club-events'] });
      toast.success('Event updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update event');
    },
  });
};

/**
 * Delete an event
 */
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (eventId: string) => eventService.deleteEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['club-events'] });
      toast.success('Event deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete event');
    },
  });
};

/**
 * RSVP to an event
 */
export const useRsvpEvent = (eventId: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: () => eventService.rsvpEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event', eventId] });
      queryClient.invalidateQueries({ queryKey: ['club-events'] });
      toast.success('RSVP successful!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to RSVP');
    },
  });
};

/**
 * Cancel RSVP to an event
 */
export const useCancelRsvp = (eventId: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: () => eventService.cancelRsvp(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event', eventId] });
      queryClient.invalidateQueries({ queryKey: ['club-events'] });
      toast.success('RSVP cancelled');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to cancel RSVP');
    },
  });
};