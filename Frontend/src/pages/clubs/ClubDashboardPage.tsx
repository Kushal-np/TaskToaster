import { useParams } from 'react-router-dom';
import ClubStats from '../../components/features/clubs/ClubStats';
import MemberList from '../../components/features/clubs/MemberList';

const ClubDashboardPage = () => {
  const { clubId } = useParams();
  // Fetch club-specific data based on clubId

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Club Dashboard</h1>
      <p>Showing data for Club ID: {clubId}</p>

      <ClubStats totalMembers={15} totalMeetings={42} />

      <MemberList members={[]} />
    </div>
  );
};

export default ClubDashboardPage;