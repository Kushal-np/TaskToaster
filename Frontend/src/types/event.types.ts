import type { IClub } from "./club.types";

export interface IEvent {
  _id: string;
  clubId: string | IClub;
  eventName: string;
  description: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  venueType: 'online' | 'offline' | 'hybrid';
  speaker?: string;
  speakerTitle?: string;
  topic?: string;
  registrationLink?: string;
  whatsappLink?: string;
  zoomLink?: string;
  attendees: string[]; // Array of User IDs
  maxAttendees?: number;
  isPublic: boolean;
  eventType: 'workshop' | 'contest' | 'meeting' | 'social' | 'other';
  createdBy: string; // User ID
  createdAt: string;
  updatedAt: string;
}

export type ICreateEventRequest = Omit<IEvent, '_id' | 'attendees' | 'createdBy' | 'createdAt' | 'updatedAt'>;