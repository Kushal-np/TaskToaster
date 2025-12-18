import { apiClient, EVENT_ENDPOINTS } from '../api';
import type { ICreateEventRequest, IEvent } from '../types';

export const createEvent = async (eventData: ICreateEventRequest): Promise<IEvent> => {
  const { data } = await apiClient.post(EVENT_ENDPOINTS.CREATE, eventData);
  return data;
};