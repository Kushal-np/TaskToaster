import Badge from '../../ui/Badge';
import { MeetingStatus as MeetingStatusEnum } from '../../../types/meeting.types'; // Assuming types are in src/types

interface MeetingStatusProps {
  status: MeetingStatusEnum;
}

const MeetingStatus = ({ status }: MeetingStatusProps) => {
  const statusConfig = {
    [MeetingStatusEnum.DRAFT]: { label: 'Draft', color: 'gray' as const },
    [MeetingStatusEnum.SCHEDULED]: { label: 'Scheduled', color: 'blue' as const },
    [MeetingStatusEnum.ONGOING]: { label: 'Ongoing', color: 'yellow' as const },
    [MeetingStatusEnum.COMPLETED]: { label: 'Completed', color: 'green' as const },
    [MeetingStatusEnum.CANCELLED]: { label: 'Cancelled', color: 'red' as const },
  };

  const { label, color } = statusConfig[status] || statusConfig.draft;

  return <Badge color={color}>{label}</Badge>;
};

export default MeetingStatus;