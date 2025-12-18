export enum MeetingStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface IMeeting {
  _id: string;
  clubId: string;
  meetingNumber: number;
  theme: string;
  meetingDate: string;
  startTime: string;
  toastmasterOfDay: string; // User ID
  status: MeetingStatus;
  createdBy: string; // User ID
  createdAt: string;
  updatedAt: string;
}

export interface ICreateMeetingRequest {
  clubId: string;
  theme: string;
  meetingDate: string;
  startTime: string;
}