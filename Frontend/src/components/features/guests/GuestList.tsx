import GuestCard from './GuestCard';
import EmptyState from '../../ui/EmptyState';
import type { IGuest } from '../../../types';

interface GuestListProps {
  guests: IGuest[];
}

const GuestList = ({ guests }: GuestListProps) => {
  if (!guests || guests.length === 0) {
    return <EmptyState title="No Guests Found" message="There are no guests matching your search." />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {guests.map((guest) => <GuestCard key={guest._id} guest={guest} />)}
    </div>
  );
};

export default GuestList;