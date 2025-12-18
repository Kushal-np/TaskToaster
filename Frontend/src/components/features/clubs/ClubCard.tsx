import { Link } from 'react-router-dom';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import Card from '../../ui/Card';
import type { IClub } from '../../../types';

interface ClubCardProps {
  club: IClub;
}

const ClubCard = ({ club }: ClubCardProps) => {
  return (
    <Link to={`/clubs/${club._id}`} className="block hover:shadow-lg transition-shadow duration-200">
      <Card>
        <Card.Header>
          <p className="text-base font-semibold text-indigo-600 truncate">{club.clubName}</p>
          <p className="text-sm text-gray-500">Club #{club.clubNumber}</p>
        </Card.Header>
        <Card.Footer>
          <div className="flex items-center text-xs text-gray-500"><UserGroupIcon className="h-4 w-4 mr-1.5" /> {club.members.length} Members</div>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default ClubCard;