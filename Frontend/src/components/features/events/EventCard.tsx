import { Link } from 'react-router-dom';
import { CalendarIcon } from '@heroicons/react/24/outline';
import Card from '../../ui/Card';
import Badge from '../../ui/Badge';
import type { IEvent } from '../../../types';

interface EventCardProps {
  event: IEvent;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link to={`/events/${event._id}`} className="block hover:shadow-lg transition-shadow duration-200">
      <Card>
        <Card.Header>
          <p className="text-base font-semibold text-indigo-600 truncate">{event.eventName}</p>
          <Badge color="blue">{event.eventType}</Badge>
        </Card.Header>
        <Card.Body>
          <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
          <div className="flex items-center text-sm text-gray-500 mt-4">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>{new Date(event.eventDate).toLocaleDateString()}</span>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default EventCard;