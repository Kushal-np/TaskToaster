import EmptyState from '../../components/ui/EmptyState';

const MeetingReportsPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Meeting Reports</h1>
      <EmptyState title="Reports Coming Soon" message="This feature is under construction." />
    </div>
  );
};

export default MeetingReportsPage;