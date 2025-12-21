import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';

const MeetingReportsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link 
            to="/meetings"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-2"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Meetings
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Meeting Reports</h1>
          <p className="text-gray-600 mt-1">Analytics and insights from your meetings</p>
        </div>
      </div>

<div className="max-w-md mx-auto mt-24 text-center space-y-4">
  <h2 className="text-2xl font-bold text-gray-900">Reports Coming Soon</h2>
  <p className="text-gray-600">
    Meeting reports and analytics features are currently under construction. You'll be able to view attendance, role performance, and meeting statistics here.
  </p>
  <Link to="/meetings">
    <Button>View Meetings</Button>
  </Link>
</div>

    </div>
  );
};

export default MeetingReportsPage;