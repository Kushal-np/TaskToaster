import { apiClient, DASHBOARD_ENDPOINTS } from '../api';
import type { IUserDashboardData } from '../types';

export const getUserDashboardData = async (): Promise<IUserDashboardData> => {
  const { data } = await apiClient.get(DASHBOARD_ENDPOINTS.GET_USER_DASHBOARD);
  return data.data;
};
