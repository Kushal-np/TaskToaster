// src/services/clubService.ts
import axios from 'axios';
import type { IClub, ICreateClubRequest, IUpdateClubRequest } from '../types';
import { API_BASE_URL, CLUB_ENDPOINTS } from '../api/endpoints';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const clubService = {
  createClub: async (data: ICreateClubRequest): Promise<IClub> => {
    const res = await api.post(CLUB_ENDPOINTS.CREATE, data);
    return res.data.club;
  },

  joinClub: async (clubNumber: string): Promise<IClub> => {
    const res = await api.post(CLUB_ENDPOINTS.JOIN, { clubNumber });
    return res.data.data;
  },

  getMyClubs: async (): Promise<IClub[]> => {
    const res = await api.get(CLUB_ENDPOINTS.GET_MY_CLUBS);
    return res.data.data;
  },

  getClubById: async (id: string): Promise<IClub> => {
    const res = await api.get(CLUB_ENDPOINTS.GET_BY_ID(id));
    return res.data.data;
  },

  updateClub: async (id: string, data: IUpdateClubRequest): Promise<IClub> => {
    const res = await api.put(CLUB_ENDPOINTS.UPDATE(id), data);
    return res.data.data;
  },
};
