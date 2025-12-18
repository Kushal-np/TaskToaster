import { useParams } from 'react-router-dom';
import MeetingForm from '../../components/features/meetings/MeetingForm';

const EditMeetingPage = () => {
  const { id } = useParams();
  // Fetch meeting data to use as defaultValues
  const mockMeeting: any = {};
  const mockClubs: any[] = [];

  const handleUpdateMeeting = (data: any) => {
    console.log('Updating meeting:', id, data);
    // Call API to update meeting
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Meeting</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <MeetingForm onSubmit={handleUpdateMeeting} defaultValues={mockMeeting} clubs={mockClubs} />
      </div>
    </div>
  );
};

export default EditMeetingPage;