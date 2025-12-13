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
  SCHEDULED = "scheduled",
  ONGOING = "ongoing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface IMeeting extends Document {
  _id: Types.ObjectId;
  clubId: Types.ObjectId;
  meetingNumber: number;
  theme: string;
  meetingDate: Date;
  startTime: string;
  toastmasterOfDay: Types.ObjectId;
  status: MeetingStatus;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// For nested agenda items (used in Agenda model)
export interface IAgendaItemInput {
  time: string;
  role: string;
  assignedTo: Types.ObjectId | null;
  assignedToModel: string;
  assignedToName: string;
  allocatedTime: string;
  sequence: number;
}

// For Agenda collection (nested structure)
export interface IAgenda extends Document {
  _id: Types.ObjectId;
  meetingId: Types.ObjectId;
  items: IAgendaItemInput[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IEvent extends Document {
  _id: Types.ObjectId;
  clubId: Types.ObjectId;
  eventName: string;
  description: string;
  eventDate: Date;
  eventTime: string;
  venue: string;
  speaker?: string;
  topic?: string;
  registrationLink?: string;
  whatsappLink?: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}


//Guests 

export interface IGuest extends Document{
  _id:Types.ObjectId ; 
  name:string ; 
  email?:string ; 
  phone?:string ; 
  isToastmaster:boolean ; 
  homeClubNumber?:string ;
  homeClubName?:string ; 
  invitedBy: Types.ObjectId ; 
  meetingIds: Types.ObjectId[];
  rolesTaken : string[];
  createdAt:Date ; 
  updatedAt:Date ; 
}


//template 
export interface ITemplateItem {
  time:string; 
  role:string; 
  allocatedItem:string; 
  sequence : number ; 
  isRequired:boolean ; 
  description?:string ;
}

export interface IAgendaTemplate extends Document {
  _id:Types.ObjectId ; 
  name:string ;
  description:string ;
  items:ITemplateItem[];
  clubId? : Types.ObjectId ; 
  isDefault :boolean ; 
  createdBy: Types.ObjectId ; 
  timeUsed : number ; 
  createdAt:Date ; 
  updatedAt : Date ; 
}



export interface IEvent extends Document {
  _id: Types.ObjectId;
  clubId: Types.ObjectId;
  eventName: string;
  description: string;
  eventDate: Date;
  eventTime: string;
  venue: string;
  venueType: 'online' | 'offline' | 'hybrid';
  speaker?: string;
  speakerTitle?: string; // DTM, World Champion, etc.
  topic?: string;
  registrationLink?: string;
  whatsappLink?: string;
  zoomLink?: string;
  attendees: Types.ObjectId[]; // Users who RSVP'd
  maxAttendees?: number;
  isPublic: boolean; // Can non-members see it?
  eventType: 'workshop' | 'contest' | 'meeting' | 'social' | 'other';
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}


export interface IRoleHistory extends Document{
  _id:Types.ObjectId ; 
  userId ?:Types.ObjectId ; 
  guestId ? : Types.ObjectId ; 
  userModel: "User" | "Guest" ; 
  participantName: string ; 
  meetingId:Types.ObjectId ; 
  role:string ; 
  completedAt:Date ; 
  feedback? :string; 
  rating? :number;
  givenBy? : Types.ObjectId ; 
  createdAt:Date;
  updatedAt:Date ;
}




//speeches
export interface ISpeech extends Document {
  _id: Types.ObjectId;
  speakerId: Types.ObjectId;
  speakerModel: 'User' | 'Guest';
  speakerName: string;
  meetingId: Types.ObjectId;
  title: string;
  speechType: 'prepared' | 'evaluation' | 'icebreaker';
  pathwaysProject?: {
    level: string;
    pathway: string;
    projectName: string;
  };
  objectives?: string[];
  duration: string;
  targetDuration: string;
  evaluatorId?: Types.ObjectId;
  evaluatorFeedback?: string;
  evaluatorRating?: number;
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}


// table topic

export interface ITableTopic extends Document {
  _id: Types.ObjectId;
  meetingId: Types.ObjectId;
  participantId?: Types.ObjectId;
  guestId?: Types.ObjectId;
  participantModel: 'User' | 'Guest';
  participantName: string;
  topic: string;
  duration: string;
  targetDuration: string;
  rating?: number;
  notes?: string;
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}


//attendance
export interface IAttendance extends Document {
  _id: Types.ObjectId;
  meetingId: Types.ObjectId;
  userId?: Types.ObjectId;
  guestId?: Types.ObjectId;
  attendeeModel: 'User' | 'Guest';
  attendeeName: string;
  checkInTime?: Date;
  checkOutTime?: Date;
  status: 'present' | 'absent' | 'late';
  createdAt: Date;
  updatedAt: Date;
}
