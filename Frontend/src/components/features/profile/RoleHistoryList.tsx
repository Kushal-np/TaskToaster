import type { IRoleHistory } from '../../../types';
import EmptyState from '../../ui/EmptyState';

interface RoleHistoryListProps {
  history: IRoleHistory[];
}

const RoleHistoryList = ({ history }: RoleHistoryListProps) => {
  if (!history || history.length === 0) {
    return <EmptyState title="No Role History" message="You haven't performed any roles yet." />;
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {history.map((item, itemIdx) => (
          <li key={item._id}>
            <div className="relative pb-8">
              {itemIdx !== history.length - 1 ? <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" /> : null}
              <div className="relative flex space-x-3">
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between items-center"><p className="text-sm text-gray-500">{item.role} in <span className="font-medium text-gray-900">"{item.meetingId.theme}"</span></p><p className="text-right text-sm text-gray-400">{new Date(item.completedAt).toLocaleDateString()}</p></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleHistoryList;