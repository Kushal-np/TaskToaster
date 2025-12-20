import { useNavigate } from 'react-router-dom';
import ClubCard from './ClubCard';
import type { IClub } from '../../../types';

interface ClubListProps {
  clubs: IClub[];
}

const ClubList = ({ clubs }: ClubListProps) => {
  const navigate = useNavigate();

  const handleSelectClub = (clubId: string) => {
    navigate(`/clubs/${clubId}`);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {clubs.map((club) => (
        <ClubCard
          key={club._id}
          club={club}
          onClick={() => handleSelectClub(club._id)}
        />
      ))}
    </div>
  );
};

export default ClubList;