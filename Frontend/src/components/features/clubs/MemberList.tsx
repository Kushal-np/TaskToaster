import MemberCard from './MemberCard';
import EmptyState from '../../ui/EmptyState';
import type { IUser } from '../../../types';

interface MemberListProps {
  members: Partial<IUser>[]; // Use a partial user type for member lists
}

const MemberList = ({ members }: MemberListProps) => {
  if (!members || members.length === 0) {
    return <EmptyState title="No Members" message="This club doesn't have any members yet." />;
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Members ({members.length})</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <MemberCard key={member._id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default MemberList;