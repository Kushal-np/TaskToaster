import axios from 'axios';
import { API_BASE_URL } from './endpoints';

/**
 * A pre-configured Axios instance for making API requests.
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  /**
   * `withCredentials` is essential for sending cookies (like the auth token)
   * with cross-origin requests.
   */
  withCredentials: true,
});

// You can add interceptors here to handle global request/response logic,
// such as refreshing tokens or handling global error states.
// For example: apiClient.interceptors.response.use(...)

export default apiClient;