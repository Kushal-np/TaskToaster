// src/hooks/useClubMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clubService } from '../services/clubService';

export const useClubMutations = () => {
  const qc = useQueryClient();

  const updateClub = useMutation({
    mutationFn: ({ clubId, data }: any) =>
      clubService.updateClub(clubId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['club'] });
      qc.invalidateQueries({ queryKey: ['my-clubs'] });
    },
  });

  return { updateClub };
};
