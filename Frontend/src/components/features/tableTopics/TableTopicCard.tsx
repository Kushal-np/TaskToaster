import type { ITableTopic } from '../../../types';
import Card from '../../ui/Card';

interface TableTopicCardProps {
  topic: ITableTopic;
}

const TableTopicCard = ({ topic }: TableTopicCardProps) => {
  return (
    <Card>
      <Card.Body>
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium text-gray-800 truncate">"{topic.topic}"</p>
            <p className="text-sm text-gray-500">in "{topic.meetingId.theme}"</p>
          </div>
          <p className="text-xs text-gray-400 flex-shrink-0 ml-4">{new Date(topic.completedAt).toLocaleDateString()}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TableTopicCard;