import type { IRoleHistory } from '../../../types';
import Card from '../../ui/Card';

interface RoleHistoryCardProps {
  item: IRoleHistory;
}

const RoleHistoryCard = ({ item }: RoleHistoryCardProps) => {
  return (
    <Card>
      <Card.Body>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-indigo-600">{item.role}</p>
            <p className="text-sm text-gray-600">in "{item.meetingId.theme}"</p>
          </div>
          <p className="text-xs text-gray-400">{new Date(item.completedAt).toLocaleDateString()}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RoleHistoryCard;