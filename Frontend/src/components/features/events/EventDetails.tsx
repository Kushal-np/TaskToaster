import type { IEvent } from '../../../types';
import Badge from '../../ui/Badge';
import RSVPButton from './RSVPButton';

interface EventDetailsProps {
  event: IEvent;
  userId: string; // Current user's ID
}

const EventDetails = ({ event, userId }: EventDetailsProps) => {
  const hasRsvpd = event.attendees.includes(userId);

  return (
    <div className="rounded-lg bg-white p-8 shadow">
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold">{event.eventName}</h1>
        <Badge color="blue">{event.eventType}</Badge>
      </div>
      <p className="mt-2 text-gray-500">
        {new Date(event.eventDate).toLocaleDateString()} at {event.eventTime} &bull; {event.venue}
      </p>
      <p className="mt-6 text-gray-700">{event.description}</p>

      <div className="mt-8 border-t pt-6">
        <RSVPButton eventId={event._id} hasRsvpd={hasRsvpd} />
        <p className="mt-2 text-sm text-gray-500">{event.attendees.length} people are going.</p>
      </div>
    </div>
  );
};

export default EventDetails;