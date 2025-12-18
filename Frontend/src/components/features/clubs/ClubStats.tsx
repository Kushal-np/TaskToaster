import { UserGroupIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

interface StatItemProps {
  icon: React.ElementType;
  label: string;
  value: number;
}

const StatItem = ({ icon: Icon, label, value }: StatItemProps) => (
  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
    <Icon className="h-8 w-8 text-indigo-500" />
    <div className="ml-4">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </div>
);

const ClubStats = ({ totalMembers, totalMeetings }: { totalMembers: number; totalMeetings: number }) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <StatItem icon={UserGroupIcon} label="Total Members" value={totalMembers} />
      <StatItem icon={CalendarDaysIcon} label="Total Meetings" value={totalMeetings} />
    </div>
  );
};

export default ClubStats;