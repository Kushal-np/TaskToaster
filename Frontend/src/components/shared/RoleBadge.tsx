import Badge from '../ui/Badge';

interface RoleBadgeProps {
  role: string;
}

// This map provides a consistent color scheme for common roles across the app.
const roleColorMap: Record<string, 'gray' | 'green' | 'yellow' | 'blue' | 'red'> = {
  'Speaker': 'blue',
  'Evaluator': 'green',
  'Timer': 'yellow',
  'TMoD': 'red',
  'General Evaluator': 'red',
  'Grammarian': 'blue',
  'Ah-Counter': 'yellow',
};

const RoleBadge = ({ role }: RoleBadgeProps) => {
  const color = roleColorMap[role] || 'gray';
  return <Badge color={color}>{role}</Badge>;
};

export default RoleBadge;