// src/pages/templates/EditTemplatePage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useTemplate, useUpdateTemplate } from '../../hooks/useTemplates';
import { useClubs } from '../../hooks/useClubs';
import { useAppSelector } from '../../store/hooks';
import TemplateForm from '../../components/features/templates/TemplateForm';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { useToast } from '../../hooks/useToast';
import type { ICreateTemplateRequest } from '../../types';
import {  ShieldExclamationIcon } from '@heroicons/react/24/outline';

const EditTemplatePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAppSelector((state) => state.auth);
  
  const { data: template, isLoading: templateLoading } = useTemplate(id!);
  const { data: clubs, isLoading: clubsLoading } = useClubs();
  const updateTemplateMutation = useUpdateTemplate(id!);

  const handleUpdateTemplate = async (data: ICreateTemplateRequest) => {
    try {
      // The form already sends the correct structure with allocatedItem
      // Just pass it directly to the mutation
      await updateTemplateMutation.mutateAsync(data);
      navigate(`/templates/${id}`);
    } catch (error: any) {
      // Backend will return 403 if not authorized
      if (error.response?.status === 403) {
        toast.error('You are not authorized to edit this template');
      }
      console.error('Failed to update template:', error);
    }
  };

  if (templateLoading || clubsLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="lg" text="Loading template..." />
      </div>
    );
  }

  if (!template) {
    return (
      <EmptyState
        title="Template Not Found"
        message="The template you're looking for doesn't exist."
      />
    );
  }

  // Check if user can edit (frontend check to match backend)
  const createdById = typeof template.createdBy === 'object' 
    ? template._id 
    : template.createdBy;
  const isCreator = createdById === user?._id;
const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';
  const canEdit = isCreator || isAdmin;

  // Cannot edit default templates
  if (template.isDefault) {
    return (
      <EmptyState
        title="Cannot Edit Default Template"
        message="Default templates are system-provided and cannot be modified. Create a copy if you need a custom version."
      />
    );
  }

  // Cannot edit if not authorized
  if (!canEdit) {
    return (
      <EmptyState
        title="Not Authorized"
        message="You don't have permission to edit this template. Only the creator or club admins can make changes."
      />
    );
  }

  // Prepare default values - map allocatedItem to allocatedItem (form expects this)
  const defaultValues: Partial<ICreateTemplateRequest> = {
    name: template.name,
    description: template.description || '',
    items: template.items.map(item => ({
      time: item.time,
      role: item.role,
      allocatedItem: item.allocatedItem, // Backend model field
      sequence: item.sequence,
      isRequired: item.isRequired || false,
      description: item.description || '',
    })),
    clubId: typeof template.clubId === 'object' && template.clubId
      ? template._id 
      : template.clubId || undefined,
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Edit Template</h1>
        <p className="mt-2 text-sm text-gray-600">
          Update template details and agenda items
        </p>
      </div>

      {/* Permission Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <ShieldExclamationIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
          <div className="text-sm text-blue-700">
            <p className="font-medium">You have edit permissions</p>
            <p className="mt-1">
              {isCreator && 'You created this template'}
              {isAdmin && !isCreator && 'You are a club admin'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <TemplateForm
          onSubmit={handleUpdateTemplate}
          isLoading={updateTemplateMutation.isPending}
          defaultValues={defaultValues}
          clubs={clubs || []}
        />
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Important Notes
        </h3>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Changes will affect future meetings that use this template</li>
          <li>Past meetings that used this template will not be affected</li>
          <li>Re-ordering items will update their sequence numbers automatically</li>
          <li>Template usage counter will be preserved</li>
        </ul>
      </div>
    </div>
  );
};

export default EditTemplatePage;