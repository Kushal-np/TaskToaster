import type { IRoleHistory, ISpeech } from '../../../types';
import Card from '../../ui/Card';

interface RecentActivityProps {
  roles: IRoleHistory[];
  speeches: ISpeech[];
}

const RecentActivity = ({ roles, speeches }: RecentActivityProps) => {
  // Combine and sort activities by date
  const activities = [
    ...roles.map(r => ({ ...r, type: 'Role', date: new Date(r.completedAt) })),
    ...speeches.map(s => ({ ...s, type: 'Speech', date: new Date(s.completedAt) }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <Card>
      <Card.Header>Recent Activity</Card.Header>
      <Card.Body>
        {activities.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {activities.slice(0, 7).map((activity) => (
              <li key={`${activity.type}-${activity._id}`} className="py-3">
                <p className="text-sm font-medium text-gray-800">
                  {activity.type === 'Role' ? `Took role: ${activity.role}` : `Gave speech: ${activity.title}`}
                </p>
                <p className="text-xs text-gray-500">{activity.date.toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No recent activity to show.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default RecentActivity;