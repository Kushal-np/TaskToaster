import { useParams } from 'react-router-dom';
import EventForm from '../../components/features/events/EventForm';

const EditEventPage = () => {
  const { id } = useParams();
  // Fetch event data to use as defaultValues
  const mockEvent: any = {};
  const mockClubs: any[] = [];

  const handleUpdateEvent = (data: any) => {
    console.log('Updating event:', id, data);
    // Call API to update event
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Event</h1>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <EventForm onSubmit={handleUpdateEvent} defaultValues={mockEvent} clubs={mockClubs} />
      </div>
    </div>
  );
};

export default EditEventPage;