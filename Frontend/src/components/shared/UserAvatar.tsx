import type { IUser } from '../../types';
import Avatar from '../ui/Avatar';

interface UserAvatarProps {
  user: Partial<IUser>;
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar = ({ user, size = 'md' }: UserAvatarProps) => {
  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2) : '?';
  // The `src` would come from the user object if it existed, e.g., user.avatarUrl
  // For now, it will fall back to showing initials.
  return <Avatar initials={initials} size={size} />;
};

export default UserAvatar;