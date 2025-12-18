import { apiClient, MEETING_ENDPOINTS } from '../api';
import type { ICreateMeetingRequest, IMeeting } from '../types';

export const createMeeting = async (meetingData: ICreateMeetingRequest): Promise<IMeeting> => {
  const { data } = await apiClient.post(MEETING_ENDPOINTS.CREATE, meetingData);
  return data;
};