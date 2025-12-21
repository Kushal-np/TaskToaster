import MeetingCard from './MeetingCard';
import EmptyState from '../../ui/EmptyState';
import type { IMeeting } from '../../../types/meeting.types';

interface MeetingListProps {
  meetings: IMeeting[];
}

const MeetingList = ({ meetings }: MeetingListProps) => {
  if (!meetings || meetings.length === 0) {
    return <EmptyState title="No Meetings Found" message="There are no meetings matching your criteria." />;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {meetings.map((meeting) => <MeetingCard key={meeting._id} meeting={meeting} />)}
    </div>
  );
};

export default MeetingList;