import type { IGuest } from '../../../types';
import Avatar from '../../ui/Avatar';
import Badge from '../../ui/Badge';
import Card from '../../ui/Card';

interface GuestCardProps {
  guest: IGuest;
}

const GuestCard = ({ guest }: GuestCardProps) => {
  const initials = guest.name ? guest.name.charAt(0).toUpperCase() : '?';

  return (
    <Card>
      <Card.Body>
        <div className="flex items-center space-x-4">
          <Avatar initials={initials} />
          <div>
            <p className="text-sm font-medium text-gray-900">{guest.name}</p>
            <p className="text-xs text-gray-500">{guest.email || 'No email provided'}</p>
          </div>
        </div>
        {guest.isToastmaster && <div className="mt-3"><Badge color="blue">Toastmaster</Badge></div>}
      </Card.Body>
    </Card>
  );
};

export default GuestCard;