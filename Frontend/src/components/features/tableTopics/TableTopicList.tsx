import TableTopicCard from './TableTopicCard';
import EmptyState from '../../ui/EmptyState';
import type { ITableTopic } from '../../../types';

interface TableTopicListProps {
  topics: ITableTopic[];
}

const TableTopicList = ({ topics }: TableTopicListProps) => {
  if (!topics || topics.length === 0) {
    return <EmptyState title="No Table Topics History" message="You haven't participated in any table topics yet." />;
  }

  return (
    <div className="space-y-4">
      {topics.map((topic) => <TableTopicCard key={topic._id} topic={topic} />)}
    </div>
  );
};

export default TableTopicList;