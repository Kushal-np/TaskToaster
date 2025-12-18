import { Link } from 'react-router-dom';
import MeetingList from '../../components/features/meetings/MeetingList';
import { Button } from '../../components/ui/Button';

const MeetingCalendarPage = () => {
  // Fetch meetings data
  const mockMeetings: any[] = [];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Meetings</h1>
        <Link to="/meetings/create"><Button>Create Meeting</Button></Link>
      </div>
      <MeetingList meetings={mockMeetings} />
    </div>
  );
};

export default MeetingCalendarPage;