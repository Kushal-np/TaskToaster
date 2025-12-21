import { Link } from 'react-router-dom';
import { Button } from '../../ui/Button';

const QuickActions = () => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/meetings/create">
          <Button  className="w-full">Create Meeting</Button>
        </Link>
        <Link to="/events/create">
          <Button  className="w-full">Create Event</Button>
        </Link>
        <Link to="/guests/add">
          <Button  className="w-full">Add Guest</Button>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;