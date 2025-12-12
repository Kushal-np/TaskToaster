import { Document, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    password: string;
    clubIds?: Types.ObjectId[];
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IRegisterRequest {
    name: string;
    email: string;
    phone: string;
    password: string;
    role?: string;
}

export interface IUserResponse {
    name: string;
    email: string;
    phone: string;
    clubIds: Types.ObjectId[];
    role: string;
    createdAt: Date;
}

export interface IClub extends Document {
    clubName: string;
    clubNumber: string;
    region: string;
    district: string;
    division: string;
    area: string;
    charteredDate: Date;
    createdBy: Types.ObjectId;
    members: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IAuthResponse {
    user: IUserResponse;
    message: string;
}

export interface IJWTPayload {
    userId: string;
    role: string;
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export enum MeetingStatus {
    DRAFT = "draft",
    SCHEDULED = 'scheduled',
    ONGOING = 'ongoing',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

export interface IMeeting extends Document {
  _id: Types.ObjectId;
  clubId: string;
  meetingNumber: number;
  theme: string;
  meetingDate: Date;
  startTime: string;
  toastmasterOfDay: string;
  status: MeetingStatus;
  createdBy: string; 
  createdAt: Date;
  updatedAt: Date;
}

export interface IAgendaItem {
  time: string; 
  role: string; 
  assignedTo: string; 
  assignedToName?: string; 
  allocatedTime: string; 
  sequence: number;
}

export interface IAgenda extends Document {
  _id: Types.ObjectId;
  meetingId: string;
  items: IAgendaItem[];
  createdAt: Date;
  updatedAt: Date;
}


export interface IEvent extends Document {
  _id: Types.ObjectId;
  clubId: string;
  eventName: string;
  description: string;
  eventDate: Date;
  eventTime: string;
  venue: string; 
  speaker?: string;
  topic?: string;
  registrationLink?: string;
  whatsappLink?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}