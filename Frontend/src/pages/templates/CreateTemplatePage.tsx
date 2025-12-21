// src/pages/templates/CreateTemplatePage.tsx
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCreateTemplate } from '../../hooks/useTemplates';
import { useClubs } from '../../hooks/useClubs';
import TemplateForm from '../../components/features/templates/TemplateForm';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import type { ICreateTemplateRequest } from '../../types';

const CreateTemplatePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clubIdFromUrl = searchParams.get('clubId');
  
  const { data: clubs, isLoading: clubsLoading } = useClubs();
  const createTemplateMutation = useCreateTemplate();

  const handleCreateTemplate = async (data: ICreateTemplateRequest) => {
    try {
      // The form already sends the correct structure with allocatedItem
      // Just pass it directly to the mutation
      await createTemplateMutation.mutateAsync(data);
      navigate('/templates');
    } catch (error) {
      // Error is handled by the hook with toast
      console.error('Failed to create template:', error);
    }
  };

  if (clubsLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  // Initial values with clubId from URL if provided
  const defaultValues = clubIdFromUrl 
    ? { clubId: clubIdFromUrl, items: [] } 
    : { items: [] };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Create New Template</h1>
        <p className="mt-2 text-sm text-gray-600">
          Create a reusable agenda template for your meetings
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <TemplateForm
          onSubmit={handleCreateTemplate}
          isLoading={createTemplateMutation.isPending}
          defaultValues={defaultValues}
          clubs={clubs || []}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">
          Template Tips
        </h3>
        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
          <li>Add all standard roles for your meeting format (TMoD, Evaluator, etc.)</li>
          <li>Set realistic time allocations for each segment</li>
          <li>Items are automatically sequenced in order</li>
          <li>Leave club field empty to create a personal template</li>
          <li>Templates can be reused across multiple meetings</li>
        </ul>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          What happens after creation?
        </h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>✓ Template will be marked as custom (not default)</li>
          <li>✓ You'll be set as the creator</li>
          <li>✓ Template can be applied to any meeting</li>
          <li>✓ You can edit or delete it later</li>
          {clubs && clubs.length > 0 && (
            <li>✓ Optionally associate with a specific club</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CreateTemplatePage;