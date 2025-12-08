export interface IMeeting{
  clubId: Object;
  meetingNumber: number;
  theme: string;
  meetingDate: Date;
  startTime: string;
  tmod: Object;
  agenda: IAgendaItem[];
}


export interface IAgendaItem{
  time: string; 
  agenda: string; 
  assignedTo: Object; 
  allocatedTime: string; 
  sequence: number;
}