import type { ITableTopic } from '../../../types';
import EmptyState from '../../ui/EmptyState';

interface TableTopicsListProps {
  topics: ITableTopic[];
}

const TableTopicsList = ({ topics }: TableTopicsListProps) => {
  if (!topics || topics.length === 0) {
    return <EmptyState title="No Table Topics History" message="You haven't participated in any table topics yet." />;
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {topics.map((item, itemIdx) => (
          <li key={item._id}>
            <div className="relative pb-8">
              {itemIdx !== topics.length - 1 ? <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" /> : null}
              <div className="relative flex space-x-3">
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between items-center"><p className="text-sm text-gray-500">Spoke on topic <span className="font-medium text-gray-900">"{item.topic}"</span></p><p className="text-right text-sm text-gray-400">{new Date(item.completedAt).toLocaleDateString()}</p></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableTopicsList;