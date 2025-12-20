// src/hooks/useMeetings.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { meetingService } from '../services/meetingService';
import type { IMeeting, ICreateMeetingRequest, IUpdateMeetingRequest } from '../types';

// ========== QUERY HOOKS (Read operations) ==========

export const useClubMeetings = (clubId?: string) => {
  return useQuery({
    queryKey: ['club-meetings', clubId],
    queryFn: () => meetingService.getClubMeetings(clubId!),
    enabled: !!clubId,
  });
};

export const useAllClubMeetings = (clubId?: string) => {
  return useQuery({
    queryKey: ['all-club-meetings', clubId],
    queryFn: () => meetingService.getAllClubMeetings(clubId!),
    enabled: !!clubId,
  });
};

// ✅ ADD THIS HOOK - Get single meeting by ID
export const useMeeting = (meetingId?: string) => {
  return useQuery({
    queryKey: ['meeting', meetingId],
    queryFn: () => meetingService.getMeetingById(meetingId!),
    enabled: !!meetingId,
  });
};

// ========== MUTATION HOOKS (Write operations) ==========

// ✅ Update this hook to match the EditMeetingPage's expected signature
export const useUpdateMeeting = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ meetingId, meetingData }: { meetingId: string; meetingData: IUpdateMeetingRequest }) => 
      meetingService.updateMeeting(meetingId, meetingData),
    onSuccess: (data) => {
      // Invalidate specific meeting and club meetings
      queryClient.invalidateQueries({ queryKey: ['meeting', data._id] });
      queryClient.invalidateQueries({ queryKey: ['club-meetings', data.clubId] });
    },
  });
};

// ✅ Add this hook for creating meetings
export const useCreateMeeting = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (payload: ICreateMeetingRequest) => meetingService.createMeeting(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['club-meetings', data.clubId] });
      queryClient.invalidateQueries({ queryKey: ['all-club-meetings', data.clubId] });
    },
  });
};

// ✅ Add this hook for deleting meetings
export const useDeleteMeeting = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (meetingId: string) => meetingService.deleteMeeting(meetingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['club-meetings'] });
    },
  });
};

// ✅ Add this hook for updating meeting status
export const useUpdateMeetingStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ meetingId, status }: { meetingId: string; status: string }) => 
      meetingService.updateMeetingStatus(meetingId, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['meeting', data._id] });
      queryClient.invalidateQueries({ queryKey: ['club-meetings', data.clubId] });
    },
  });
};