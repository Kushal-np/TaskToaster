// src/pages/templates/TemplateGalleryPage.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTemplates } from '../../hooks/useTemplates';
import { useClubs } from '../../hooks/useClubs';
import TemplateList from '../../components/features/templates/TemplateList';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import { PlusIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const TemplateGalleryPage = () => {
  const { data: clubs, isLoading: clubsLoading } = useClubs();
  const [selectedClubId, setSelectedClubId] = useState<string>('');
  
  // Fetch templates based on selected club filter
  // If no club selected, pass undefined to get all templates (default + personal)
  const { data: templates, isLoading: templatesLoading, error } = useTemplates(
    selectedClubId || undefined
  );

  const isLoading = templatesLoading || clubsLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="lg" text="Loading templates..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Template Gallery</h1>
        </div>
        <EmptyState
          title="Failed to Load Templates"
          message="There was an error loading templates. Please try again."
        />
      </div>
    );
  }

  // Separate default and custom templates
  const defaultTemplates = templates?.filter(t => t.isDefault) || [];
  const customTemplates = templates?.filter(t => !t.isDefault) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Template Gallery</h1>
          <p className="mt-1 text-sm text-gray-600">
            {templates?.length || 0} template{templates?.length === 1 ? '' : 's'} available
          </p>
        </div>
        <Link to="/templates/create">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </Link>
      </div>

      {/* Filter */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <label htmlFor="club-filter" className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Filter by Club:
          </label>
          <Select
            id="club-filter"
            value={selectedClubId}
            onChange={(e) => setSelectedClubId(e.target.value)}
            className="w-full sm:w-64"
            disabled={!clubs || clubs.length === 0}
          >
            <option value="">All Templates (Default + Custom)</option>
            {clubs?.map((club) => (
              <option key={club._id} value={club._id}>
                {club.clubName}
              </option>
            ))}
          </Select>
          {selectedClubId && (
            <Button
              size="sm"
              onClick={() => setSelectedClubId('')}
            >
              Clear Filter
            </Button>
          )}
        </div>
        {!clubs || clubs.length === 0 ? (
          <p className="text-xs text-gray-500 mt-2">
            No clubs available to filter. Join or create a club first.
          </p>
        ) : null}
      </div>

      {/* No templates at all */}
      {(!templates || templates.length === 0) && (
        <EmptyState
          title="No Templates Found"
          message={
            selectedClubId
              ? "This club doesn't have any templates yet. Try removing the filter or create a new template."
              : "No templates available yet. Create your first template to get started!"
          }
        />
      )}

      {/* Default Templates Section */}
      {defaultTemplates.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Default Templates</h2>
              <p className="text-sm text-gray-600 mt-1">
                Standard templates provided by the system
              </p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {defaultTemplates.length} template{defaultTemplates.length === 1 ? '' : 's'}
            </span>
          </div>
          <TemplateList templates={defaultTemplates} />
        </div>
      )}

      {/* Custom Templates Section */}
      {(customTemplates.length > 0 || (templates && templates.length > 0)) && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedClubId ? 'Club Templates' : 'Custom Templates'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {selectedClubId 
                  ? 'Templates created for this specific club'
                  : 'Templates created by you and your clubs'
                }
              </p>
            </div>
            {customTemplates.length > 0 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {customTemplates.length} template{customTemplates.length === 1 ? '' : 's'}
              </span>
            )}
          </div>
          
          {customTemplates.length === 0 ? (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="text-center">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No Custom Templates</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedClubId
                    ? "This club doesn't have any custom templates yet."
                    : "You haven't created any custom templates yet."}
                </p>
                <div className="mt-6">
                  <Link to="/templates/create">
                    <Button>
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Create Your First Template
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <TemplateList templates={customTemplates} />
          )}
        </div>
      )}

      {/* Stats */}
      {templates && templates.length > 0 && (
        <div className="bg-linear-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4 text-center">
            Template Statistics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-indigo-600">{templates.length}</p>
              <p className="text-xs text-gray-600 mt-1">Total Templates</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-green-600">{defaultTemplates.length}</p>
              <p className="text-xs text-gray-600 mt-1">Default Templates</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-blue-600">{customTemplates.length}</p>
              <p className="text-xs text-gray-600 mt-1">Custom Templates</p>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">
          About Templates
        </h3>
        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
          <li><strong>Default Templates:</strong> System-provided templates available to everyone</li>
          <li><strong>Custom Templates:</strong> Templates created by you or your club members</li>
          <li><strong>Club Filter:</strong> View templates specific to a particular club</li>
          <li>Click any template to view details, edit, or delete (if you have permissions)</li>
        </ul>
      </div>
    </div>
  );
};

export default TemplateGalleryPage;