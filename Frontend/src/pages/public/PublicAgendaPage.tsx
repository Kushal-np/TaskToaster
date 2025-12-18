import { useParams } from 'react-router-dom';

const PublicAgendaPage = () => {
  const { meetingId } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Meeting Agenda</h1>
      <p className="text-gray-600">Viewing agenda for Meeting ID: {meetingId}</p>
      {/* Here you would fetch and display the agenda for the given meetingId */}
    </div>
  );
};

export default PublicAgendaPage;