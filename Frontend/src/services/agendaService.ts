import axios from 'axios';
import { API_BASE_URL, AGENDA_ENDPOINTS } from '../api/endpoints';
import type {
  IAgendaItem,
  ICreateAgendaItemRequest,
  IUpdateAgendaItemRequest,
  IReorderAgendaRequest,
} from '../types/meeting.types';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const agendaService = {
  getAgendaItems: async (meetingId: string): Promise<IAgendaItem[]> => {
    const res = await api.get<{ success: boolean; data: IAgendaItem[] }>(
      AGENDA_ENDPOINTS.GET_ITEMS(meetingId)
    );
    return res.data.data ?? [];
  },

  createAgendaItem: async (
    meetingId: string,
    payload: Omit<ICreateAgendaItemRequest, 'meetingId'>
  ): Promise<IAgendaItem> => {
    const res = await api.post<{ success: boolean; data: IAgendaItem }>(
      AGENDA_ENDPOINTS.CREATE_ITEM(meetingId),
      payload
    );
    return res.data.data;
  },

  updateAgendaItem: async (
    itemId: string,
    updates: IUpdateAgendaItemRequest
  ): Promise<IAgendaItem> => {
    const res = await api.put<{ success: boolean; data: IAgendaItem }>(
      AGENDA_ENDPOINTS.UPDATE_ITEM(itemId),
      updates
    );
    return res.data.data;
  },

  deleteAgendaItem: async (itemId: string): Promise<void> => {
    await api.delete(AGENDA_ENDPOINTS.DELETE_ITEM(itemId));
  },

  reorderAgendaItems: async (
    meetingId: string,
    payload: IReorderAgendaRequest
  ): Promise<IAgendaItem[]> => {
    const res = await api.put<{ success: boolean; data: IAgendaItem[] }>(
      AGENDA_ENDPOINTS.REORDER_ITEMS(meetingId),
      payload
    );
    return res.data.data;
  },

  applyTemplate: async (
    meetingId: string,
    templateId: string
  ): Promise<IAgendaItem[]> => {
    const res = await api.post<{ success: boolean; data: IAgendaItem[] }>(
      AGENDA_ENDPOINTS.APPLY_TEMPLATE(meetingId),
      { templateId }
    );
    return res.data.data;
  },
};
