import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import LiveTimer from '../../components/features/meetings/LiveTimer';
import LiveMeetingControl from '../../components/features/meetings/LiveMeetingControl';
import RoleDisplay from '../../components/features/meetings/RoleDisplay';
import NextUpDisplay from '../../components/features/meetings/NextUpDisplay';
import AttendanceTracker from '../../components/features/meetings/AttendanceTracker';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import { useMeeting } from '../../hooks/useMeetings';

const LiveMeetingPage = () => {
  const { id } = useParams<{ id: string }>();
  const { meeting, isLoading } = useMeeting(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading meeting..." />
      </div>
    );
  }

  if (!meeting) {
    return (
      <EmptyState
        title="Meeting Not Found"
        message="The meeting you're looking for doesn't exist."
        action={
          <Link to="/meetings">
            <Button>Back to Meetings</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link 
          to={`/meetings/${id}`}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Meeting Details
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">{meeting.theme}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <RoleDisplay role="Speaker 1" assignedTo="Member Name" />
          <LiveTimer />
          <LiveMeetingControl />
        </div>
        <div className="space-y-8">
          <NextUpDisplay />
          <AttendanceTracker />
        </div>
      </div>
    </div>
  );
};

export default LiveMeetingPage;