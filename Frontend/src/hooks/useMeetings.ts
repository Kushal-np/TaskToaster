// src/hooks/useMeetings.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { meetingService } from '../services/meetingService';
import type {
  IMeeting,
  ICreateMeetingRequest,
  IUpdateMeetingRequest,
} from '../types/meeting.types';

// ========== QUERY HOOKS (Read operations) ==========

export const useClubMeetings = (clubId?: string) => {
  return useQuery<IMeeting[], Error>({
    queryKey: ['club-meetings', clubId],
    queryFn: () => meetingService.getClubMeetings(clubId!),
    enabled: !!clubId,
  });
};

export const useAllClubMeetings = (clubId?: string) => {
  return useQuery<IMeeting[], Error>({
    queryKey: ['all-club-meetings', clubId],
    queryFn: () => meetingService.getAllClubMeetings(clubId!),
    enabled: !!clubId,
  });
};

// ✅ Get single meeting by ID
export const useMeeting = (meetingId?: string) => {
  return useQuery<IMeeting, Error>({
    queryKey: ['meeting', meetingId],
    queryFn: () => meetingService.getMeetingById(meetingId!),
    enabled: !!meetingId,
  });
};

// ========== MUTATION HOOKS (Write operations) ==========

// ✅ Update meeting
export const useUpdateMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IMeeting,
    Error,
    { meetingId: string; meetingData: IUpdateMeetingRequest }
  >({
    mutationFn: ({ meetingId, meetingData }) =>
      meetingService.updateMeeting(meetingId, meetingData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['meeting', data._id] });
      queryClient.invalidateQueries({ queryKey: ['club-meetings', data.clubId] });
      queryClient.invalidateQueries({ queryKey: ['all-club-meetings', data.clubId] });
    },
  });
};

// ✅ Create meeting
export const useCreateMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation<IMeeting, Error, ICreateMeetingRequest>({
    mutationFn: (payload) => meetingService.createMeeting(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['club-meetings', data.clubId] });
      queryClient.invalidateQueries({ queryKey: ['all-club-meetings', data.clubId] });
    },
  });
};

// ✅ Delete meeting
export const useDeleteMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (meetingId) => meetingService.deleteMeeting(meetingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['club-meetings'] });
      queryClient.invalidateQueries({ queryKey: ['all-club-meetings'] });
    },
  });
};

// ✅ Update meeting status
export const useUpdateMeetingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IMeeting,
    Error,
    { meetingId: string; status: string }
  >({
    mutationFn: ({ meetingId, status }) =>
      meetingService.updateMeetingStatus(meetingId, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['meeting', data._id] });
      queryClient.invalidateQueries({ queryKey: ['club-meetings', data.clubId] });
      queryClient.invalidateQueries({ queryKey: ['all-club-meetings', data.clubId] });
    },
  });
};
