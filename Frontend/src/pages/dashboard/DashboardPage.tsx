import StatsCard from '../../components/features/dashboard/StatsCard';
import RecentActivity from '../../components/features/dashboard/RecentActivity';
import QuickActions from '../../components/features/dashboard/QuickActions';
import { useDashboard } from '../../hooks/useDashboard';

const DashboardPage = () => {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading dashboard...</div>;
  }

  if (isError || !data) {
    return <div className="text-red-500 p-8">Error loading dashboard data.</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Roles Taken" value={data.roleStats.totalRoles} />
        <StatsCard title="Total Speeches" value={data.speechStats.totalSpeeches} />
        <StatsCard title="Table Topics" value={data.tableTopicStats.total} />
        <StatsCard title="Clubs Joined" value={data.clubs.length} />
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8">
          <QuickActions />
          <RecentActivity roles={data.roleHistory} speeches={data.speeches} />
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;