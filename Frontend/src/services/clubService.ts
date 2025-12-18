import { apiClient, CLUB_ENDPOINTS } from '../api';
import type { IClub, ICreateClubRequest, IJoinClubRequest } from '../types';

export const createClub = async (clubData: ICreateClubRequest): Promise<IClub> => {
  const { data } = await apiClient.post(CLUB_ENDPOINTS.CREATE, clubData);
  return data;
};

export const joinClub = async (clubData: IJoinClubRequest): Promise<IClub> => {
  const { data } = await apiClient.post(CLUB_ENDPOINTS.JOIN, clubData);
  return data;
};