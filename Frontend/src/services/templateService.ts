// src/services/templateService.ts
import apiClient from '../api/axiosConfig';
import type { IAgendaTemplate, ICreateTemplateRequest } from '../types';

const TEMPLATE_ENDPOINTS = {
  CREATE: '/v1/template/create',
  GET_ALL: '/v1/template/',
  GET_BY_ID: (id: string) => `/v1/template/${id}`,
  UPDATE: (id: string) => `/v1/template/${id}`,
  DELETE: (id: string) => `/v1/template/${id}`,
};

export const templateService = {
  /**
   * Create a new template
   */
  async createTemplate(templateData: ICreateTemplateRequest): Promise<IAgendaTemplate> {
    const response = await apiClient.post(TEMPLATE_ENDPOINTS.CREATE, templateData);
    return response.data.data;
  },

  /**
   * Get all templates (with optional club filter)
   */
  async getTemplates(clubId?: string): Promise<IAgendaTemplate[]> {
    let url = TEMPLATE_ENDPOINTS.GET_ALL;
    if (clubId) url += `?clubId=${clubId}`;
    const response = await apiClient.get(url);
    return response.data.data;
  },

  /**
   * Get a specific template by ID
   */
  async getTemplateById(templateId: string): Promise<IAgendaTemplate> {
    const response = await apiClient.get(TEMPLATE_ENDPOINTS.GET_BY_ID(templateId));
    return response.data.data;
  },

  /**
   * Update template information
   */
  async updateTemplate(templateId: string, updateData: Partial<ICreateTemplateRequest>): Promise<IAgendaTemplate> {
    const response = await apiClient.put(TEMPLATE_ENDPOINTS.UPDATE(templateId), updateData);
    return response.data.data;
  },

  /**
   * Delete a template
   */
  async deleteTemplate(templateId: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete(TEMPLATE_ENDPOINTS.DELETE(templateId));
    return response.data;
  },
};

// Named exports for backwards compatibility
export const createTemplate = templateService.createTemplate;
export const getTemplates = templateService.getTemplates;
export const getTemplateById = templateService.getTemplateById;
export const updateTemplate = templateService.updateTemplate;
export const deleteTemplate = templateService.deleteTemplate;