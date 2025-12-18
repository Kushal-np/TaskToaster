import { useQuery } from '@tanstack/react-query';
import * as dashboardService from '../services/dashboardService';

/**
 * Custom hook to fetch user dashboard data.
 */
export const useDashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['userDashboard'],
    queryFn: dashboardService.getUserDashboardData,
  });
  return { data, isLoading, isError };
};