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