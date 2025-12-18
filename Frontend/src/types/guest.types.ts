export interface IGuest {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  invitedBy: string; // User ID
  clubId: string;
  isToastmaster: boolean;
  homeClubName?: string;
  homeClubNumber?: string;
  meetingIds: string[];
  rolesTaken: number;
  createdAt: string;
  updatedAt: string;
}