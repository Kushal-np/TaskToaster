import { Link } from 'react-router-dom';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import Card from '../../ui/Card';
import MeetingStatus from './MeetingStatus';
import type { IMeeting } from '../../../types';

interface MeetingCardProps {
  meeting: IMeeting;
}

const MeetingCard = ({ meeting }: MeetingCardProps) => {
  return (
    <Link to={`/meetings/${meeting._id}`} className="block hover:shadow-lg transition-shadow duration-200">
      <Card>
        <Card.Header>
          <div className="flex justify-between items-start">
            <p className="text-base font-semibold text-indigo-600 truncate">{meeting.theme}</p>
            <MeetingStatus status={meeting.status} />
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