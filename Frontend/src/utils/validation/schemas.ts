import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Invalid phone number' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export const createClubSchema = z.object({
  clubName: z.string().min(3, 'Club name is required'),
  clubNumber: z.string().min(5, 'Club number is required'),
  region: z.string().min(1, 'Region is required'),
  district: z.string().min(1, 'District is required'),
  division: z.string().min(1, 'Division is required'),
  area: z.string().min(1, 'Area is required'),
  charteredDate: z.string().min(1, 'Chartered date is required'),
});

export const createMeetingSchema = z.object({
  clubId: z.string().min(1, 'Please select a club'),
  theme: z.string().min(3, 'Theme must be at least 3 characters'),
  meetingDate: z.string().min(1, 'Meeting date is required'),
  startTime: z.string().min(1, 'Start time is required'),
});