export interface IAgendaItem {
  _id: string;
  meetingId: string;
  time: string;
  role: string;
  assignedTo?: string; // User or Guest ID
  assignedToModel: 'User' | 'Guest';
  assignedToName?: string; // Denormalized for easy display
  allocatedTime: string;
  sequence: number;
  isCompleted: boolean;
  actualDuration?: string;
}

export type ICreateAgendaItemRequest = Omit<IAgendaItem, '_id' | 'isCompleted' | 'actualDuration'>;

export type IUpdateAgendaItemRequest = Partial<Omit<IAgendaItem, '_id' | 'meetingId'>> & {
  id: string;
};