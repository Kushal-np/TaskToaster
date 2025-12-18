import ClubCard from './ClubCard';
import EmptyState from '../../ui/EmptyState';
import type { IClub } from '../../../types';

interface ClubListProps {
  clubs: IClub[];
}

const ClubList = ({ clubs }: ClubListProps) => {
  if (!clubs || clubs.length === 0) {
    return <EmptyState title="No Clubs Found" message="You are not a member of any clubs yet." />;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {clubs.map((club) => <ClubCard key={club._id} club={club} />)}
    </div>
  );
};

export default ClubList;