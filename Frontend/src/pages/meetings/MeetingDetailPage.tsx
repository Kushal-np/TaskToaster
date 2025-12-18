import { useParams } from 'react-router-dom';
import MeetingDetails from '../../components/features/meetings/MeetingDetails';
import AgendaTable from '../../components/features/meetings/AgendaTable';

const MeetingDetailPage = () => {
  const { id } = useParams();
  // Fetch meeting and agenda data based on id
  const mockMeeting: any = { theme: 'Mock Meeting', status: 'scheduled', meetingNumber: 1, meetingDate: new Date().toISOString(), startTime: '19:00' };
  const mockAgendaItems: any[] = [];

  return (
    <div className="space-y-8">
      <MeetingDetails meeting={mockMeeting} />
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Agenda</h2>
        <AgendaTable items={mockAgendaItems} />
      </div>
    </div>
  );
};

export default MeetingDetailPage;