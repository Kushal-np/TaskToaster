// src/pages/meetings/AgendaBuilderPage.tsx
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  DocumentDuplicateIcon,
  TrashIcon 
} from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { useMeeting } from '../../hooks/useMeetings';
import { 
  useAgendaItems, 
  useCreateAgendaItem, 
  useDeleteAgendaItem 
} from '../../hooks/useAgenda';
import AgendaForm from '../../components/features/meetings/AgendaForm';
import type { ICreateAgendaItemRequest } from '../../types/meeting.types';

const AgendaBuilderPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);

  // Early return if no meeting ID
if (!id) {
  return (
    <div className="max-w-md mx-auto mt-24 text-center space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Meeting ID Missing</h2>
      <p className="text-gray-600">
        Cannot load agenda without a meeting ID.
      </p>
      <Link to="/meetings">
        <Button>Back to Meetings</Button>
      </Link>
    </div>
  );
}


  // Hooks (id is guaranteed to be a string here)
  const { data: meeting, isLoading: meetingLoading } = useMeeting(id);
  const { data: agendaItems, isLoading: agendaLoading } = useAgendaItems(id);
  const createAgendaItem = useCreateAgendaItem(id);
  const deleteAgendaItem = useDeleteAgendaItem(id);

  // Handlers
  const handleAddItem = async (data: Omit<ICreateAgendaItemRequest, 'meetingId' | 'sequence'>) => {
    try {
      const sequence = agendaItems ? agendaItems.length + 1 : 1;
      await createAgendaItem.mutateAsync({
        ...data,
        sequence,
        assignedToModel: data.assignedToModel || 'User',
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add agenda item:', error);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm('Delete this agenda item?')) return;
    try {
      await deleteAgendaItem.mutateAsync(itemId);
    } catch (error) {
      console.error('Failed to delete agenda item:', error);
    }
  };

  // Loading state
  if (meetingLoading || agendaLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading agenda..." />
      </div>
    );
  }

  // Meeting not found
if (!meeting) {
  return (
    <div className="max-w-md mx-auto mt-24 text-center space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Meeting Not Found</h2>
      <p className="text-gray-600">
        The meeting you're looking for doesn't exist.
      </p>
      <Link to="/meetings">
        <Button>Back to Meetings</Button>
      </Link>
    </div>
  );
}


  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link 
            to={`/meetings/${id}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-2"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Meeting Details
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Agenda Builder</h1>
          <p className="text-gray-600 mt-1">{meeting.theme}</p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={() => {/* TODO: Implement template selection */}}
          >
            <DocumentDuplicateIcon className="h-4 w-4 mr-2" />
            Apply Template
          </Button>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Add Item Form */}
      {showAddForm && (
        <Card>
          <Card.Header>Add Agenda Item</Card.Header>
          <Card.Body>
            <AgendaForm
              onSubmit={handleAddItem}
              isLoading={createAgendaItem.isPending}
            />
          </Card.Body>
        </Card>
      )}

      {/* Agenda Table */}
      <Card>
        <Card.Header>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Agenda Items</h2>
            <span className="text-sm text-gray-500">
              {agendaItems?.length || 0} items
            </span>
          </div>
        </Card.Header>
        <Card.Body>
          {agendaItems && agendaItems.length > 0 ? (
            <div className="space-y-3">
              {agendaItems.map((item) => (
                <div 
                  key={item._id} 
                  className="flex items-center justify-between p-4 border rounded hover:bg-gray-50"
                >
                  <div className="flex-1 grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Time</p>
                      <p className="font-medium">{item.time}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Role</p>
                      <p className="font-medium">{item.role}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Assigned To</p>
                      <p className="font-medium">
                        {item.assignedToName || (
                          <span className="italic text-gray-400">Unassigned</span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-medium">{item.allocatedTime}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleDeleteItem(item._id)}
                    isLoading={deleteAgendaItem.isPending}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Agenda Items"
              message="Click 'Add Item' to start building your meeting agenda."
            />
          )}
        </Card.Body>
      </Card>

      {/* Quick Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button onClick={() => navigate(`/meetings/${id}`)}>Cancel</Button>
        <Button onClick={() => navigate(`/meetings/${id}`)}>Done</Button>
      </div>
    </div>
  );
};

export default AgendaBuilderPage;
