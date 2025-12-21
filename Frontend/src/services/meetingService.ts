// src/services/meetingService.ts
import axios from 'axios';
import type { IMeeting, ICreateMeetingRequest, IUpdateMeetingRequest } from '../types/meeting.types';
import { MEETING_ENDPOINTS } from '../api/endpoints';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://task-toaster-backend.vercel.app/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const meetingService = {
  // ✅ Get single meeting by ID
  getMeetingById: async (id: string): Promise<IMeeting> => {
    try {
      const res = await api.get<{ success: boolean; data: IMeeting }>(
        MEETING_ENDPOINTS.GET_BY_ID(id)
      );
      if (!res.data.success) {
        throw new Error('Failed to fetch meeting');
      }
      return res.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch meeting');
    }
  },

  // Get club meetings
  getClubMeetings: async (clubId: string): Promise<IMeeting[]> => {
    try {
      const res = await api.get<{ success: boolean; data: IMeeting[] }>(
        MEETING_ENDPOINTS.GET_CLUB_MEETINGS(clubId)
      );
      if (!res.data.success) {
        throw new Error('Failed to fetch club meetings');
      }
      return res.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch club meetings');
    }
  },

  // Get all meetings for a club
  getAllClubMeetings: async (clubId: string): Promise<IMeeting[]> => {
    try {
      const res = await api.get<{ success: boolean; data: IMeeting[] }>(
        MEETING_ENDPOINTS.GET_ALL_FOR_CLUB(clubId)
      );
      if (!res.data.success) {
        throw new Error('Failed to fetch meetings');
      }
      return res.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch meetings');
    }
  },

  // ✅ Create a new meeting
  createMeeting: async (payload: ICreateMeetingRequest): Promise<IMeeting> => {
    try {
      const res = await api.post<{ success: boolean; message: string; data: IMeeting }>(
        MEETING_ENDPOINTS.CREATE,
        payload
      );
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      return res.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create meeting');
    }
  },

  // ✅ Update meeting
  updateMeeting: async (id: string, payload: IUpdateMeetingRequest): Promise<IMeeting> => {
    try {
      const res = await api.put<{ success: boolean; message: string; data: IMeeting }>(
        MEETING_ENDPOINTS.UPDATE(id),
        payload
      );
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      return res.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update meeting');
    }
  },

  // ✅ Update meeting status
  updateMeetingStatus: async (id: string, status: string): Promise<IMeeting> => {
    try {
      const res = await api.patch<{ success: boolean; message: string; data: IMeeting }>(
        MEETING_ENDPOINTS.UPDATE_STATUS(id),
        { status }
      );
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      return res.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update meeting status');
    }
  },

  // ✅ Delete meeting
  deleteMeeting: async (id: string): Promise<void> => {
    try {
      const res = await api.delete<{ success: boolean; message: string }>(
        MEETING_ENDPOINTS.DELETE(id)
      );
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete meeting');
    }
  },
};
