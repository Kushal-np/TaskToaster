import EventForm from '../../components/features/events/EventForm';

const CreateEventPage = () => {
  const handleCreateEvent = (data: any) => {
    console.log('Creating event:', data);
    // Call API to create event
  };

  // Fetch clubs for the select dropdown
  const mockClubs: any[] = [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create New Event</h1>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <EventForm onSubmit={handleCreateEvent} clubs={mockClubs} />
      </div>
    </div>
  );
};

export default CreateEventPage;