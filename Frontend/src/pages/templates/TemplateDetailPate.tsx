// src/pages/templates/TemplateDetailPage.tsx
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useTemplate, useDeleteTemplate } from '../../hooks/useTemplates';
import { useAppSelector } from '../../store/hooks';
import TemplatePreview from '../../components/features/templates/TemplatePreview';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { 
  DocumentTextIcon, 
  PencilIcon, 
  TrashIcon,
  CalendarIcon,
  UserIcon,
  ShieldExclamationIcon 
} from '@heroicons/react/24/outline';

const TemplateDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const { data: template, isLoading } = useTemplate(id!);
  const deleteTemplateMutation = useDeleteTemplate();

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteTemplateMutation.mutateAsync(id);
      navigate('/templates');
    } catch (error) {
      // Error handled by hook
    }
  };

  if (isLoading) {
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

  // Check permissions
  const createdById = typeof template.createdBy === 'object' 
    ? template._id 
    : template.createdBy;
  const isCreator = createdById === user?._id;
const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';
  const canEdit = !template.isDefault && (isCreator || isAdmin);
  const canDelete = !template.isDefault && (isCreator || isAdmin);

  // Get creator name
  const creatorName = typeof template.createdBy === 'object'
    ? template.name
    : 'Unknown';

  // Get club name
  const clubName = typeof template.clubId === 'object' && template.clubId
    ? template.clubName
    : null;

  // Calculate total duration (simple estimation)
  const totalDuration = template.items.reduce((acc, item) => {
    const match = item.allocatedItem.match(/\d+/);
    return acc + (match ? parseInt(match[0]) : 0);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{template.name}</h1>
            {template.isDefault && (
              <Badge color="green">Default Template</Badge>
            )}
          </div>
          {template.description && (
            <p className="text-gray-600 mt-2">{template.description}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {canEdit && (
            <Link to={`/templates/${id}/edit`}>
              <Button >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
          )}
          {canDelete && (
            <Button
              onClick={() => setShowDeleteConfirm(true)}
              isLoading={deleteTemplateMutation.isPending}
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <DocumentTextIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Agenda Items</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{template.items.length}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <CalendarIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Times Used</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{template.timesUsed}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <UserIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Created By</span>
          </div>
          <p className="text-sm font-medium text-gray-900 truncate">{creatorName}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <CalendarIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Est. Duration</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalDuration} mins</p>
        </div>
      </div>

      {/* Club Association */}
      {clubName && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <ShieldExclamationIcon className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Club Template</p>
              <p className="text-sm text-blue-700 mt-1">
                This template is associated with <strong>{clubName}</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Permission Info */}
      {!canEdit && !template.isDefault && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <ShieldExclamationIcon className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-900">View Only</p>
              <p className="text-sm text-yellow-700 mt-1">
                You don't have permission to edit this template. Only the creator or club admins can make changes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Template Preview */}
      <div className="bg-white rounded-lg shadow p-6">
        <TemplatePreview template={template} />
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Template?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete "{template.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                isLoading={deleteTemplateMutation.isPending}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateDetailPage;