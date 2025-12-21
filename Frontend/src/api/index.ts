import axios from 'axios';

// Base URL for your backend
export const API_BASE_URL = 'https://tasktoaster-15.onrender.com/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for handling the HttpOnly cookie
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized (token expired or invalid)
    if (error.response && error.response.status === 401) {
      // Optional: Dispatch logout action or redirect to login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  GET_ME: '/auth/getMe',
};

export const CLUB_ENDPOINTS = {
  CREATE: '/club/create',
  JOIN: '/club/join',
  GET_MY_CLUBS: '/club/getMyclub',
  UPDATE: (id: string) => `/club/updateClub/${id}`,
};

export const MEETING_ENDPOINTS = {
  CREATE: '/v1/meeting/create',
  GET_CLUB_MEETINGS: (clubId: string) => `/v1/meeting/club/${clubId}`,
  GET_BY_ID: (id: string) => `/v1/meeting/${id}`,
};

export const DASHBOARD_ENDPOINTS = {
  GET_USER_DASHBOARD: '/v1/dashboard/user',
  GET_CLUB_DASHBOARD: (clubId: string) => `/v1/dashboard/club/${clubId}`,
};
