export interface ITemplateItem {
  time: string;
  role: string;
  allocatedTime: string;
  sequence: number;
  isRequired: boolean;
  description?: string;
}

export interface IAgendaTemplate {
  _id: string;
  name: string;
  description?: string;
  items: ITemplateItem[];
  clubId?: string; // Optional for default templates
  isDefault: boolean;
  createdBy: string; // User ID
  timesUsed: number;
  createdAt: string;
  updatedAt: string;
}

export type ICreateTemplateRequest = Omit<IAgendaTemplate, '_id' | 'isDefault' | 'createdBy' | 'timesUsed' | 'createdAt' | 'updatedAt'>;