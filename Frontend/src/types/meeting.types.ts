// src/types/meeting.types.ts

export enum MeetingStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface IResourceLink {
  _id?: string;
  name: string;
  url: string;
}

export interface IMeeting {
  _id: string;
  clubId: string | { _id: string; clubName: string; clubNumber: string };
  meetingNumber: number;
  theme: string;
  meetingDate: string;
  startTime: string;
  toastmasterOfDay?: string | { _id: string; name: string; email: string; phone?: string };
  status: MeetingStatus;
  venue?: string;
  venueLink?: string;
  onlineLink?: string;
  onlineMeetingId?: string;
  onlinePasscode?: string;
  whatsappLink?: string;
  resourceLinks?: IResourceLink[];
  isHybrid: boolean;
  createdBy: string | { _id: string; name: string; email: string };
  agendaItems?: IAgendaItem[];
  createdAt: string;
  updatedAt: string;
  meeting?:string;
}

export interface IAgendaItem {
  _id: string;
  meetingId: string;
  time: string;
  role: string;
  assignedTo?: string | { _id: string; name: string; email: string; phone?: string };
  assignedToModel: 'User' | 'Guest';
  assignedToName?: string;
  allocatedTime: string;
  sequence: number;
  isCompleted: boolean;
  actualDuration?: string;
  createdAt?: string;
  updatedAt?: string;
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
  resourceLinks?: IResourceLink[];
  isHybrid?: boolean;
}

export interface IResourceLink {
  name: string;
  url: string;
}

export interface IUpdateMeetingRequest {
  // Basic meeting info
  theme?: string;
  meetingDate?: string;
  startTime?: string;
  toastmasterOfDay?: string;

  // Venue info
  venue?: string;
  venueLink?: string;
  isHybrid?: boolean;

  // Online meeting info
  onlineLink?: string;
  onlineMeetingId?: string;
  onlinePasscode?: string;
  whatsappLink?: string;

  // Additional resources
  resourceLinks?: IResourceLink[];
}

export interface ICreateAgendaItemRequest {
  meetingId: string;
  time: string;
  role: string;
  assignedTo?: string;
  assignedToModel?: 'User' | 'Guest';
  assignedToName?: string;
  allocatedTime: string;
  sequence: number;
}

export interface IUpdateAgendaItemRequest {
  time?: string;
  role?: string;
  assignedTo?: string;
  assignedToModel?: 'User' | 'Guest';
  assignedToName?: string;
  allocatedTime?: string;
  sequence?: number;
  isCompleted?: boolean;
  actualDuration?: string;
}

export interface IReorderAgendaRequest {
  items: Array<{
    _id: string;
    time: string;
    role: string;
    assignedTo?: string;
    assignedToModel: 'User' | 'Guest';
    assignedToName?: string;
    allocatedTime: string;
  }>;
}