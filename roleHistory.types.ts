export interface IRoleHistory {
  _id: string;
  userId?: string;
  guestId?: string;
  userModel: 'User' | 'Guest';
  participantName: string;
  meetingId: {
    _id: string;
    theme: string;
    meetingDate: string;
  };
  role: string;
  completedAt: string;
  feedback?: string;
  rating?: number;
}