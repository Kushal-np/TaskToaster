import { apiClient, } from '../api';
import type { IAgendaTemplate, ICreateTemplateRequest } from '../types';

export const createTemplate = async (templateData: ICreateTemplateRequest): Promise<IAgendaTemplate> => {
  const { data } = await apiClient.post(TEMPLATE_ENDPOINTS.CREATE, templateData);
  return data;
};