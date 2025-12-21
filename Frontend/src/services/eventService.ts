// src/services/eventService.ts
import apiClient from '../api/axiosConfig';
import { EVENT_ENDPOINTS } from '../api/endpoints';
import type { ICreateEventRequest, IEvent } from '../types/event.types';

export const createEvent = async (data: ICreateEventRequest): Promise<IEvent> => {
  const response = await apiClient.post(EVENT_ENDPOINTS.CREATE, data);
  return response.data.data;
};

export const updateEvent = async (id: string, data: Partial<ICreateEventRequest>): Promise<IEvent> => {
  const response = await apiClient.put(EVENT_ENDPOINTS.UPDATE(id), data);
  return response.data.data;
};

export const deleteEvent = async (id: string) => {
  const response = await apiClient.delete(EVENT_ENDPOINTS.DELETE(id));
  return response.data;
};

export const getEventById = async (id: string): Promise<IEvent> => {
  const response = await apiClient.get(EVENT_ENDPOINTS.GET_BY_ID(id));
  return response.data.data;
};

export const getClubEvents = async (clubId: string, upcoming?: boolean, eventType?: string): Promise<IEvent[]> => {
  const params: any = {};
  if (upcoming) params.upcoming = true;
  if (eventType) params.eventType = eventType;

  const response = await apiClient.get(EVENT_ENDPOINTS.GET_CLUB_EVENTS(clubId), { params });
  return response.data.data;
};

export const rsvpEvent = async (id: string) => {
  const response = await apiClient.post(EVENT_ENDPOINTS.RSVP(id));
  return response.data.data;
};

export const cancelRsvp = async (id: string) => {
  const response = await apiClient.delete(EVENT_ENDPOINTS.CANCEL_RSVP(id));
  return response.data.data;
};