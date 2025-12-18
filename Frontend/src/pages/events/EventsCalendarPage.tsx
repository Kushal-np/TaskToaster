import { Link } from 'react-router-dom';
import EventList from '../../components/features/events/EventList';
import { Button } from '../../components/ui/Button';

const EventsCalendarPage = () => {
  // Fetch events data
  const mockEvents: any[] = [];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Events</h1>
        <Link to="/events/create"><Button>Create Event</Button></Link>
      </div>
      <EventList events={mockEvents} />
    </div>
  );
};

export default EventsCalendarPage;