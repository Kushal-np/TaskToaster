import { BuildingOfficeIcon, UsersIcon, CalendarIcon } from '@heroicons/react/24/outline';
import type { IClub } from '../../../types';

interface ClubCardProps {
  club: IClub;
  onClick?: () => void;
}

const ClubCard = ({ club, onClick }: ClubCardProps) => {
  const formattedDate = new Date(club.charteredDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {club.clubName}
          </h3>
          <p className="text-sm text-gray-500">Club #{club.clubNumber}</p>
        </div>
        <BuildingOfficeIcon className="h-8 w-8 text-indigo-600" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <UsersIcon className="h-4 w-4 mr-2" />
          <span>{club.members?.length || 0} members</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <CalendarIcon className="h-4 w-4 mr-2" />
          <span>Chartered: {formattedDate}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
          <div>
            <span className="font-medium">District:</span> {club.district}
          </div>
          <div>
            <span className="font-medium">Division:</span> {club.division}
          </div>
          <div>
            <span className="font-medium">Area:</span> {club.area}
          </div>
          <div>
            <span className="font-medium">Region:</span> {club.region}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubCard;