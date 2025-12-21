// src/hooks/useTemplates.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as templateService from '../services/templateService';
import { useToast } from './useToast';
import type {  ICreateTemplateRequest } from '../types';

/**
 * Get all templates (default + club-specific)
 */
export const useTemplates = (clubId?: string) => {
  return useQuery({
    queryKey: ['templates', clubId],
    queryFn: () => templateService.getTemplates(clubId),
  });
};

/**
 * Get a single template by ID
 */
export const useTemplate = (templateId: string) => {
  return useQuery({
    queryKey: ['template', templateId],
    queryFn: () => templateService.getTemplateById(templateId),
    enabled: !!templateId,
  });
};

/**
 * Create a new template
 */
export const useCreateTemplate = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (data: ICreateTemplateRequest) => templateService.createTemplate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast.success('Template created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create template');
    },
  });
};

/**
 * Update an existing template
 */
export const useUpdateTemplate = (templateId: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (data: Partial<ICreateTemplateRequest>) => 
      templateService.updateTemplate(templateId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['template', templateId] });
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast.success('Template updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update template');
    },
  });
};

/**
 * Delete a template
 */
export const useDeleteTemplate = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (templateId: string) => templateService.deleteTemplate(templateId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast.success('Template deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete template');
    },
  });
};