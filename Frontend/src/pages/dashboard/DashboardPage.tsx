import StatsCard from '../../components/features/dashboard/StatsCard';
import UpcomingMeetings from '../../components/features/dashboard/UpcomingMeetings';
import RecentActivity from '../../components/features/dashboard/RecentActivity';
import QuickActions from '../../components/features/dashboard/QuickActions';

const DashboardPage = () => {
  // Data would be fetched from a `useDashboard` hook or RTK Query
  const mockDashboardData = {
    roleStats: { totalRoles: 12 },
    speechStats: { totalSpeeches: 4 },
    tableTopicStats: { total: 8 },
    clubs: { length: 1 },
    upcomingMeetings: [],
    roleHistory: [],
    speeches: [],
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Roles Taken" value={mockDashboardData.roleStats.totalRoles} />
        <StatsCard title="Total Speeches" value={mockDashboardData.speechStats.totalSpeeches} />
        <StatsCard title="Table Topics" value={mockDashboardData.tableTopicStats.total} />
        <StatsCard title="Clubs Joined" value={mockDashboardData.clubs.length} />
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <UpcomingMeetings meetings={mockDashboardData.upcomingMeetings} className="lg:col-span-2" />
        <div className="space-y-8"><QuickActions /><RecentActivity roles={mockDashboardData.roleHistory} speeches={mockDashboardData.speeches} /></div>
      </div>
    </div>
  );
};

export default DashboardPage;