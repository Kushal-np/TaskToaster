import MeetingForm from '../../components/features/meetings/MeetingForm';

const CreateMeetingPage = () => {
  const handleCreateMeeting = (data: any) => {
    console.log('Creating meeting:', data);
    // Call API to create meeting
  };

  // Fetch clubs for the select dropdown
  const mockClubs: any[] = [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create New Meeting</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <MeetingForm onSubmit={handleCreateMeeting} clubs={mockClubs} />
      </div>
    </div>
  );
};

export default CreateMeetingPage;