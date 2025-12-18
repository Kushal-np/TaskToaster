import { StarIcon } from '@heroicons/react/24/solid';
import Card from '../../ui/Card';

const mockAchievements = [
  { id: 1, name: 'Ice Breaker' },
  { id: 2, name: 'First Evaluation' },
];

const AchievementBadges = () => {
  return (
    <Card>
      <Card.Header>Achievements</Card.Header>
      <Card.Body>
        <div className="flex flex-wrap gap-4">
          {mockAchievements.map(ach => <div key={ach.id} className="flex flex-col items-center text-center"><div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100"><StarIcon className="h-6 w-6 text-yellow-500" /></div><p className="mt-2 text-xs font-medium text-gray-600">{ach.name}</p></div>)}
        </div>
      </Card.Body>
    </Card>
  );
};

export default AchievementBadges;