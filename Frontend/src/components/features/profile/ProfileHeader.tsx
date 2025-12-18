import { Link } from 'react-router-dom';
import Avatar from '../../ui/Avatar';
import { Button } from '../../ui/Button';
import type { IUser } from '../../../types';

interface ProfileHeaderProps {
  user: IUser;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('') : '?';

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center space-x-5">
        <Avatar initials={initials} size="lg" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-sm font-medium text-gray-500">{user.email}</p>
        </div>
        <div className="flex-grow flex justify-end"><Link to="/profile/edit"><Button variant="secondary">Edit Profile</Button></Link></div>
      </div>
    </div>
  );
};

export default ProfileHeader;