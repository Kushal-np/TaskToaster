// src/pages/events/EventDetailPage.tsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEvent, useRsvpEvent, useCancelRsvp, useDeleteEvent } from '../../hooks/useEvents';
import { useAppSelector } from '../../store/hooks';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import { 
  PencilIcon, 
  TrashIcon, 
  MegaphoneIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon 
} from '@heroicons/react/24/outline';

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  
  const { data: event, isLoading } = useEvent(id!);
  const rsvpMutation = useRsvpEvent(id!);
  const cancelRsvpMutation = useCancelRsvp(id!);
  const deleteEventMutation = useDeleteEvent();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="lg" text="Loading event..." />
      </div>
    );
  }

  if (!event) {
    return (
      <EmptyState
        title="Event Not Found"
        message="The event you're looking for doesn't exist."
      />
    );
  }

  const isCreator = event.createdBy === user?._id;
  const isAttending = event.attendees.some((attendee: any) => 
    attendee._id === user?._id || attendee === user?._id
  );

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEventMutation.mutateAsync(id!);
        navigate('/events');
      } catch (error) {
        // Error is handled by the hook
      }
    }
  };

  const handleRsvpToggle = () => {
    if (isAttending) {
      cancelRsvpMutation.mutate();
    } else {
      rsvpMutation.mutate();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{event.eventName}</h1>
          <p className="mt-1 text-sm text-gray-600">
            {event.clubId && typeof event.clubId === 'object' 
              ? event.clubId.clubName 
              : 'Club Event'}
          </p>
        </div>
        {isCreator && (
          <div className="flex space-x-2">
            <Link to={`/events/${id}/edit`}>
              <Button  size="sm">
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Button 
              size="sm"
              onClick={handleDelete}
              isLoading={deleteEventMutation.isPending}
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Event Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Details Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className={`px-3 py-1 text-sm rounded-full ${
                  event.venueType === 'online' ? 'bg-blue-100 text-blue-800' :
                  event.venueType === 'hybrid' ? 'bg-purple-100 text-purple-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {event.venueType}
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800">
                  {event.eventType}
                </span>
              </div>

              <p className="text-gray-700 mb-6">{event.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Date</p>
                    <p className="text-sm">{new Date(event.eventDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <ClockIcon className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Time</p>
                    <p className="text-sm">{event.eventTime}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Venue</p>
                    <p className="text-sm">{event.venue}</p>
                  </div>
                </div>

                {event.maxAttendees && (
                  <div className="flex items-center text-gray-600">
                    <MegaphoneIcon className="h-5 w-5 mr-3 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Capacity</p>
                      <p className="text-sm">
                        {event.attendees.length} / {event.maxAttendees} registered
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {event.speaker && (
                <div className="border-t pt-4 mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Speaker</h3>
                  <p className="text-gray-700">{event.speaker}</p>
                  {event.speakerTitle && (
                    <p className="text-sm text-gray-500">{event.speakerTitle}</p>
                  )}
                  {event.topic && (
                    <p className="text-sm text-gray-600 mt-1">Topic: {event.topic}</p>
                  )}
                </div>
              )}

              {(event.registrationLink || event.whatsappLink || event.zoomLink) && (
                <div className="border-t pt-4 space-y-2">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Links</h3>
                  {event.registrationLink && (
                    <a 
                      href={event.registrationLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      Registration Link →
                    </a>
                  )}
                  {event.whatsappLink && (
                    <a 
                      href={event.whatsappLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-sm text-green-600 hover:text-green-800"
                    >
                      WhatsApp Group →
                    </a>
                  )}
                  {event.zoomLink && (
                    <a 
                      href={event.zoomLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-sm text-blue-600 hover:text-blue-800"
                    >
                      Zoom Meeting →
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RSVP Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {isAttending ? "You're registered!" : "Register for this event"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {event.attendees.length} {event.attendees.length === 1 ? 'person is' : 'people are'} attending
                </p>
              </div>
              <Button
                onClick={handleRsvpToggle}
                isLoading={rsvpMutation.isPending || cancelRsvpMutation.isPending}
              >
                {isAttending ? 'Cancel RSVP' : 'RSVP Now'}
              </Button>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default EventDetailPage;