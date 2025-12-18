import type { IClub } from './club.types';
import type { ISpeech } from './speech.types';
import type { ITableTopic } from './tableTopic.types';
import type { IRoleHistory } from './roleHistory.types';
import type { IAgendaItem } from './agenda.types';
import type { IMeeting } from './meeting.types';

interface ITableTopicStats {
  total: number;
  averageRating: number;
}

interface IRoleStats {
  totalRoles: number;
  roleBreakdown: Record<string, number>;
  averageRating: number;
}

interface ISpeechStats {
  totalSpeeches: number;
  pathwaysProgress: Record<string, number>;
  averageRating: number;
}

export interface IUserDashboardData {
  clubs: Pick<IClub, '_id' | 'clubName' | 'clubNumber'>[];
  upcomingMeetings: IMeeting[];
  upcomingRoles: IAgendaItem[];
  recentMeetings: IMeeting[];
  roleHistory: IRoleHistory[];
  roleStats: IRoleStats;
  speeches: ISpeech[];
  speechStats: ISpeechStats;
  tableTopics: ITableTopic[];
  tableTopicStats: ITableTopicStats;
}