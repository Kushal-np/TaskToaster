import { Link } from 'react-router-dom';
import Card from '../../ui/Card';
import type { IMeeting } from '../../../types';

interface UpcomingMeetingsProps {
  meetings: IMeeting[];
  className?: string;
}

const UpcomingMeetings = ({ meetings, className }: UpcomingMeetingsProps) => {
  return (
    <Card className={className}>
      <Card.Header>Upcoming Meetings</Card.Header>
      <Card.Body>
        {meetings && meetings.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {meetings.slice(0, 5).map((meeting) => (
              <li key={meeting._id} className="py-3">
                <Link to={`/meetings/${meeting._id}`} className="block hover:bg-gray-50 p-1 rounded">
                  <p className="font-medium text-indigo-700">{meeting.theme}</p>
                  <p className="text-sm text-gray-500">{new Date(meeting.meetingDate).toLocaleDateString()}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No upcoming meetings scheduled.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default UpcomingMeetings;