// src/types/meeting.types.ts
export enum MeetingStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// Resource link can be object with name and url
export interface IResourceLink {
  _id?: string;
  name: string;
  url: string;
}

// src/types/index.ts
export interface IMeeting {
  _id: string;
  theme: string;
  meetingDate: string;
  startTime?: string;
  endTime?: string;
  venue?: string;
  venueLink?: string;
  isHybrid?: boolean;
  onlineLink?: string;
  onlineMeetingId?: string;
  onlinePasscode?: string;
  whatsappLink?: string;
  resourceLinks?: string[];
  toastmasterOfDay?: string;
  clubId: string | { _id: string; clubName: string }; // Can be string or populated object
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUpdateMeetingRequest {
  theme?: string;
  meetingDate?: string;
  startTime?: string;
  endTime?: string;
  venue?: string;
  venueLink?: string;
  isHybrid?: boolean;
  onlineLink?: string;
  onlineMeetingId?: string;
  onlinePasscode?: string;
  whatsappLink?: string;
  resourceLinks?: string[];
  toastmasterOfDay?: string;
}

export interface ICreateMeetingRequest {
  clubId: string;
  theme: string;
  meetingDate: string;
  startTime: string;
  toastmasterOfDay?: string;
  venue?: string;
  venueLink?: string;
  onlineLink?: string;
  onlineMeetingId?: string;
  onlinePasscode?: string;
  whatsappLink?: string;
  resourceLinks?: IResourceLink[]; // Objects with name and url
  isHybrid?: boolean;
}

export interface IUpdateMeetingRequest {
  theme?: string;
  meetingDate?: string;
  startTime?: string;
  toastmasterOfDay?: string;
  venue?: string;
  venueLink?: string;
  onlineLink?: string;
  onlineMeetingId?: string;
  onlinePasscode?: string;
  whatsappLink?: string;
  resourceLinks ?: IResourceLink[];
  isHybrid?: boolean;
}

export interface IAgendaItem {
  _id: string;
  meetingId: string;
  title: string;
  description?: string;
  role: string;
  assignedTo?: string | {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  duration: number; // in minutes
  sequence: number;
  notes?: string;
  completed?: boolean;
  createdAt: string;
  updatedAt: string;
}