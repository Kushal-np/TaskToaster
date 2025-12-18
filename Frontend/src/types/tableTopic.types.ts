export interface ITableTopic {
  _id: string;
  participantId?: string; // User or Guest ID
  participantName: string;
  meetingId: {
    _id: string;
    theme: string;
    meetingDate: string;
  };
  topic: string;
  duration: string;
  rating?: number;
  completedAt: string;
}