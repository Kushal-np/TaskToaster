import EventCard from './EventCard';
import EmptyState from '../../ui/EmptyState';
import type { IEvent } from '../../../types';

interface EventListProps {
  events: IEvent[];
}

const EventList = ({ events }: EventListProps) => {
  if (!events || events.length === 0) {
    return <EmptyState title="No Events Found" message="There are no events scheduled for this club yet." />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => <EventCard key={event._id} event={event} />)}
    </div>
  );
};

export default EventList;