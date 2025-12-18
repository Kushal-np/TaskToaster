import { useQuery } from '@tanstack/react-query';
import * as meetingService from '../services/meetingService';

/**
 * Custom hook to manage meeting data for a specific club.
 */
export const useMeetings = (clubId: string) => {
  // The service function `getMeetingsForClub` needs to be created in `meetingService.ts`.
  const { data: meetings, isLoading, isError } = useQuery({
    queryKey: ['meetings', clubId],
    queryFn: () => Promise.resolve([]), // Placeholder for `meetingService.getMeetingsForClub(clubId)`
    enabled: !!clubId, // Ensures the query only runs when clubId is available
  });

  return { meetings, isLoading, isError };
};