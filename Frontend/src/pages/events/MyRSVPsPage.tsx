import EventList from '../../components/features/events/EventList';

const MyRSVPsPage = () => {
  // Fetch events the user has RSVP'd to
  const mockEvents: any[] = [];

  return (
    <EventList events={mockEvents} />
  );
};

export default MyRSVPsPage;