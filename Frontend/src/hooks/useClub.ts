// src/hooks/useClub.ts
import { useQuery } from '@tanstack/react-query';
import { clubService } from '../services/clubService';

export const useClub = (clubId?: string) => {
  return useQuery({
    queryKey: ['club', clubId],
    queryFn: () => clubService.getClubById(clubId!),
    enabled: !!clubId,
  });
};
