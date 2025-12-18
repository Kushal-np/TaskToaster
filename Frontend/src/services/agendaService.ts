import { apiClient, AGENDA_ENDPOINTS } from '../api';
import type { IAgendaItem, ICreateAgendaItemRequest } from '../types';

export const createAgendaItem = async (meetingId: string, itemData: Omit<ICreateAgendaItemRequest, 'meetingId'>): Promise<IAgendaItem> => {
  const { data } = await apiClient.post(AGENDA_ENDPOINTS.CREATE_ITEM(meetingId), itemData);
  return data;
};