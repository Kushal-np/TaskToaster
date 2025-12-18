export interface ISpeech {
  _id: string;
  speakerId: string; // User ID
  speakerName: string;
  meetingId: {
    _id: string;
    theme: string;
    meetingDate: string;
  };
  title: string;
  speechType: 'prepared' | 'evaluation' | 'icebreaker';
  pathwaysProject?: {
    level: string;
    pathway: string;
    projectName: string;
  };
  duration: string;
  evaluatorRating?: number;
  completedAt: string;
}