import type { IUser } from '../../../types';
import Avatar from '../../ui/Avatar';

interface MemberCardProps {
  member: Partial<IUser>;
}

const MemberCard = ({ member }: MemberCardProps) => {
  const initials = member.name ? member.name.charAt(0).toUpperCase() : '?';

  return (
    <div className="flex items-center space-x-3 rounded-lg border p-3 bg-white">
      <Avatar initials={initials} />
      <div>
        <p className="text-sm font-medium text-gray-900">{member.name}</p>
        <p className="text-xs text-gray-500">{member.email}</p>
      </div>
    </div>
  );
};

export default MemberCard;