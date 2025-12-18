import { Link } from 'react-router-dom';
import GuestList from '../../components/features/guests/GuestList';
import GuestSearch from '../../components/features/guests/GuestSearch';
import { Button } from '../../components/ui/Button';

const GuestDirectoryPage = () => {
  // Fetch guests data
  const mockGuests: any[] = [];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Guest Directory</h1>
        <Link to="/guests/add"><Button>Add Guest</Button></Link>
      </div>
      <GuestSearch onSearch={() => {}} />
      <GuestList guests={mockGuests} />
    </div>
  );
};

export default GuestDirectoryPage;