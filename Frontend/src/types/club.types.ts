// src/types/index.ts
export interface IClub {
  _id: string;
  clubName: string;
  clubNumber: string;
  region: string;
  district: string;
  division: string;
  area: string;
  charteredDate: string;
  createdBy: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ICreateClubRequest {
  clubName: string;
  clubNumber: string;
  region: string;
  district: string;
  division: string;
  area: string;
  charteredDate: string;
}

export interface IJoinClubRequest {
  clubNumber: string;
}

export type IUpdateClubRequest = Partial<ICreateClubRequest>;

export interface IMember {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

export interface IMeeting {
  _id: string;
  theme: string;
  meetingDate: string;
  clubId: string;
  // Add other meeting properties as needed
}