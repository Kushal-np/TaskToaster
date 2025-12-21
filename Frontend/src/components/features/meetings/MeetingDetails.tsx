import { Link } from 'react-router-dom';
import { Button } from '../../ui/Button';
import Card from '../../ui/Card';
import MeetingStatus from './MeetingStatus';
import type { IMeeting } from '../../../types/meeting.types';

interface MeetingDetailsProps {
  meeting: IMeeting;
}

const MeetingDetails = ({ meeting }: MeetingDetailsProps) => {
  return (
    <Card>
      <Card.Header>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{meeting.theme}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Meeting #{meeting.meetingNumber} &bull; {new Date(meeting.meetingDate).toLocaleDateString()} at {meeting.startTime}
            </p>
          </div>
          <MeetingStatus status={meeting.status} />
        </div>
      </Card.Header>
      <Card.Footer>
        <Link to={`/meetings/${meeting._id}/agenda`}><Button >Edit Agenda</Button></Link>
      </Card.Footer>
    </Card>
  );
};

export default MeetingDetails;