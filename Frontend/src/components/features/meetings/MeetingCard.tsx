import { Link } from 'react-router-dom';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import Card from '../../ui/Card';
import type { IMeeting, MeetingStatus } from '../../../types';

interface MeetingCardProps {
  meeting: IMeeting;
}

const MeetingCard = ({ meeting }: MeetingCardProps) => {
  const getStatusColor = (status: MeetingStatus) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      scheduled: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || colors.draft;
  };

  return (
    <Link to={`/meetings/${meeting._id}`} className="block hover:shadow-lg transition-shadow duration-200">
      <Card>
        <Card.Header>
          <div className="flex justify-between items-start">
            <p className="text-base font-semibold text-indigo-600 truncate">{meeting.theme}</p>
            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(meeting.status as MeetingStatus)}`}>
              {meeting.status}
            </span>
          </div>
          <p className="text-sm text-gray-500">Meeting #{meeting.meetingNumber}</p>
        </Card.Header>
        <Card.Body>
          <div className="flex items-center text-sm text-gray-500">
            <CalendarDaysIcon className="h-4 w-4 mr-2" />
            <span>{new Date(meeting.meetingDate).toLocaleDateString()} at {meeting.startTime}</span>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default MeetingCard;