import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { agendaService } from '../services/agendaService';
import type {
  IAgendaItem,
  ICreateAgendaItemRequest,
  IUpdateAgendaItemRequest,
  IReorderAgendaRequest,
} from '../types/meeting.types';

/* ----------------------------------
   Query Keys (LOCAL, SIMPLE)
----------------------------------- */
const agendaKeys = {
  list: (meetingId: string) => ['agenda', meetingId] as const,
};

/* ----------------------------------
   Get Agenda Items
----------------------------------- */
export const useAgendaItems = (meetingId: string) => {
  return useQuery<IAgendaItem[]>({
    queryKey: agendaKeys.list(meetingId),
    queryFn: () => agendaService.getAgendaItems(meetingId),
    enabled: !!meetingId,
    initialData: [],
  });
};

/* ----------------------------------
   Create Agenda Item
----------------------------------- */
export const useCreateAgendaItem = (meetingId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<ICreateAgendaItemRequest, 'meetingId'>) =>
      agendaService.createAgendaItem(meetingId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: agendaKeys.list(meetingId),
      });
    },
  });
};

/* ----------------------------------
   Update Agenda Item
----------------------------------- */
export const useUpdateAgendaItem = (meetingId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      updates,
    }: {
      itemId: string;
      updates: IUpdateAgendaItemRequest;
    }) => agendaService.updateAgendaItem(itemId, updates),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: agendaKeys.list(meetingId),
      });
    },
  });
};

/* ----------------------------------
   Delete Agenda Item
----------------------------------- */
export const useDeleteAgendaItem = (meetingId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) =>
      agendaService.deleteAgendaItem(itemId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: agendaKeys.list(meetingId),
      });
    },
  });
};

/* ----------------------------------
   Reorder Agenda Items
----------------------------------- */
export const useReorderAgendaItems = (meetingId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IReorderAgendaRequest) =>
      agendaService.reorderAgendaItems(meetingId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: agendaKeys.list(meetingId),
      });
    },
  });
};

/* ----------------------------------
   Apply Template
----------------------------------- */
export const useApplyAgendaTemplate = (meetingId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (templateId: string) =>
      agendaService.applyTemplate(meetingId, templateId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: agendaKeys.list(meetingId),
      });
    },
  });
};
