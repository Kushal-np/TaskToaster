// src/pages/events/CreateEventPage.tsx
import { useNavigate } from 'react-router-dom';
import { useClubs } from '../../hooks/useClubs';
import { useCreateEvent } from '../../hooks/useEvents';
import EventForm from '../../components/features/events/EventForm';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import type { ICreateEventRequest } from '../../types';

const CreateEventPage = () => {
  const navigate = useNavigate();
  const { data: clubs, isLoading: clubsLoading } = useClubs();
  const createEventMutation = useCreateEvent();

  const handleCreateEvent = async (data: ICreateEventRequest) => {
    try {
      const result = await createEventMutation.mutateAsync(data);
      // Extract event from response structure
      const eventId = result._id || result._id;
      navigate(`/events/${eventId}`);
    } catch (error) {
      // Error is handled by the hook with toast
    }
  };

  if (clubsLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="lg" text="Loading clubs..." />
      </div>
    );
  }

  if (!clubs || clubs.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
        <EmptyState
          title="No Clubs Available"
          message="You need to be a member of at least one club to create an event. Please join or create a club first."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
        <p className="mt-2 text-sm text-gray-600">
          Schedule a workshop, contest, or social event for your club
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto">
        <EventForm
          onSubmit={handleCreateEvent}
          isLoading={createEventMutation.isPending}
          clubs={clubs}
        />
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-4xl mx-auto">
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Event Tips
        </h3>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Add clear descriptions to help members understand the event</li>
          <li>Set a max attendees limit for capacity planning</li>
          <li>Use registration links for external RSVP tracking</li>
          <li>Share WhatsApp or Zoom links for easy access</li>
        </ul>
      </div>
    </div>
  );
};

export default CreateEventPage;