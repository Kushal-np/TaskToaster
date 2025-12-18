import { useParams } from 'react-router-dom';
import EventDetails from '../../components/features/events/EventDetails';
import AttendeeList from '../../components/features/events/AttendeeList';

const EventDetailPage = () => {
  const { id } = useParams();
  // Fetch event data based on id
  const mockEvent: any = { eventName: 'Mock Event', attendees: [] };
  const mockAttendees: any[] = [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <EventDetails event={mockEvent} userId="currentUserId" />
      </div>
      <AttendeeList attendees={mockAttendees} />
    </div>
  );
};

export default EventDetailPage;