/**
 * The base URL for all API requests.
 * It's recommended to move this to an environment variable (e.g., VITE_API_BASE_URL).
 */
export const API_BASE_URL = 'http://localhost:8000/api'; // Example URL

/**
 * Authentication endpoints.
 */
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  GET_ME: '/auth/getMe',
};

/**
 * Club management endpoints.
 */
export const CLUB_ENDPOINTS = {
  CREATE: '/v1/club/create',
  JOIN: '/v1/club/join',
  GET_MY_CLUBS: '/v1/club/getMyclub',
  UPDATE: (id: string) => `/v1/club/updateClub/${id}`,
};

/**
 * Dashboard data endpoints.
 */
export const DASHBOARD_ENDPOINTS = {
  GET_USER_DASHBOARD: '/v1/dashboard/user',
  GET_CLUB_DASHBOARD: (clubId: string) => `/v1/dashboard/club/${clubId}`,
};

/**
 * Meeting management endpoints.
 */
export const MEETING_ENDPOINTS = {
  CREATE: '/v1/meeting/create',
  GET_BY_ID: (id: string) => `/v1/meeting/${id}`,
  GET_ALL_FOR_CLUB: (clubId: string) => `/v1/meeting/all/${clubId}`,
  GET_CLUB_MEETINGS: (clubId: string) => `/v1/meeting/club/${clubId}`,
  UPDATE: (id: string) => `/v1/meeting/${id}`,
  UPDATE_STATUS: (id: string) => `/v1/meeting/${id}/status`,
  DELETE: (id: string) => `/v1/meeting/${id}`,
};

/**
 * Agenda management endpoints.
 */
export const AGENDA_ENDPOINTS = {
  GET_ITEMS: (meetingId: string) => `/v1/agenda/meetings/${meetingId}/items`,
  CREATE_ITEM: (meetingId: string) => `/v1/agenda/meetings/${meetingId}/items`,
  UPDATE_ITEM: (id: string) => `/v1/agenda/items/${id}`,
  DELETE_ITEM: (id: string) => `/v1/agenda/items/${id}`,
  REORDER_ITEMS: (meetingId: string) => `/v1/agenda/meetings/${meetingId}/reorder`,
  APPLY_TEMPLATE: (meetingId: string) => `/v1/agenda/meetings/${meetingId}/apply-template`,
};

/**
 * Event management endpoints.
 */
export const EVENT_ENDPOINTS = {
  CREATE: '/v1/event/create',
  GET_BY_ID: (id: string) => `/v1/event/${id}`,
  GET_CLUB_EVENTS: (clubId: string) => `/v1/event/club/${clubId}`,
  UPDATE: (id: string) => `/v1/event/${id}`,
  DELETE: (id: string) => `/v1/event/${id}`,
  RSVP: (id: string) => `/v1/event/${id}/rsvp`,
  CANCEL_RSVP: (id: string) => `/v1/event/${id}/rsvp`,
};

// NOTE: Endpoints for guests, templates, speeches, role history, and table topics
// would be added here following the same pattern.