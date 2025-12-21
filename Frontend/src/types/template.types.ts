import type { IClub } from "./club.types";

export interface ITemplateItem {
  time: string;
  role: string;
  allocatedItem: string;
  sequence: number;
  isRequired: boolean;
  description?: string;
}

export interface IAgendaTemplate {
  _id: string;
  name: string;
  description?: string;
  items: ITemplateItem[];
  clubId?: string | IClub; // Optional for default templates
  clubName:string;
  isDefault: boolean;
  createdBy: string; // User ID
  timesUsed: number;
  createdAt: string;
  updatedAt: string;
}

export type ICreateTemplateRequest = Omit<IAgendaTemplate, '_id' | 'isDefault' | 'createdBy' | 'timesUsed' | 'createdAt' | 'updatedAt'>;