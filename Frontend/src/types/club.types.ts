export interface IClub {
  _id: string;
  clubName: string;
  clubNumber: string;
  region: string;
  district: string;
  division: string;
  area: string;
  charteredDate: string;
  createdBy: string; // User ID
  members: string[]; // Array of User IDs
  createdAt: string;
  updatedAt: string;
}

export type ICreateClubRequest = Omit<IClub, '_id' | 'createdBy' | 'members' | 'createdAt' | 'updatedAt'>;

export interface IJoinClubRequest {
  clubNumber: string;
}