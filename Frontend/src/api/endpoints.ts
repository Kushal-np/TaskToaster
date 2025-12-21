/**
 * The base URL for all API requests.
 * It's recommended to move this to an environment variable (e.g., VITE_API_BASE_URL).
 */
export const API_BASE_URL = 'https://task-toaster-backend.vercel.app/api'; // Example URL

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
  GET_BY_ID: (id: string) => `/v1/club/${id}`,   // ✅ ADD THIS
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


export const TEMPLATE_ENDPOINTS = {
  CREATE: '/v1/template/create',
  GET_ALL: '/v1/template/',
  GET_BY_ID: (id: string) => `/v1/template/${id}`,
  UPDATE: (id: string) => `/v1/template/${id}`,
  DELETE: (id: string) => `/v1/template/${id}`,
};

export const GUEST_ENDPOINTS = {
  CREATE: '/v1/guest/create',
  GET_ALL: '/v1/guest/',
  GET_BY_ID: (id: string) => `/v1/guest/${id}`,
  UPDATE: (id: string) => `/v1/guest/${id}`,
  DELETE: (id: string) => `/v1/guest/${id}`,
};

export const SPEECH_ENDPOINTS = {
  CREATE: '/v1/speech/create',
  GET_USER_SPEECHES: (userId: string) => `/v1/speech/user/${userId}`,
  GET_MEETING_SPEECHES: (meetingId: string) => `/v1/speech/meeting/${meetingId}`,
  UPDATE: (id: string) => `/v1/speech/${id}`,
  DELETE: (id: string) => `/v1/speech/${id}`,
};

export const ROLE_HISTORY_ENDPOINTS = {
  CREATE: '/v1/role-history/create',
  GET_USER_HISTORY: (userId: string) => `/v1/role-history/user/${userId}`,
  GET_MEETING_HISTORY: (meetingId: string) => `/v1/role-history/meeting/${meetingId}`,
  UPDATE: (id: string) => `/v1/role-history/${id}`,
  DELETE: (id: string) => `/v1/role-history/${id}`,
};

export const TABLE_TOPIC_ENDPOINTS = {
  CREATE: '/v1/table-topic/create',
  GET_USER_TOPICS: (userId: string) => `/v1/table-topic/user/${userId}`,
  GET_MEETING_TOPICS: (meetingId: string) => `/v1/table-topic/meeting/${meetingId}`,
  UPDATE: (id: string) => `/v1/table-topic/${id}`,
  DELETE: (id: string) => `/v1/table-topic/${id}`,
};
// NOTE: Endpoints for guests, templates, speeches, role history, and table topics
// would be added here following the same pattern.
