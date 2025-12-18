import Card from '../../ui/Card';

interface RoleStatsProps {
  stats: {
    totalRoles: number;
    roleBreakdown: Record<string, number>;
  };
}

const RoleStats = ({ stats }: RoleStatsProps) => {
  return (
    <Card>
      <Card.Header>Role Statistics</Card.Header>
      <Card.Body>
        <p className="text-4xl font-bold">{stats.totalRoles}</p>
        <p className="text-sm text-gray-500">Total Roles Taken</p>
        <ul className="mt-4 space-y-1 text-sm">
          {Object.entries(stats.roleBreakdown).map(([role, count]) => <li key={role} className="flex justify-between"><span>{role}</span><span>{count}</span></li>)}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default RoleStats;