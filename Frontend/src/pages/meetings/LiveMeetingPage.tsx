import LiveTimer from '../../components/features/meetings/LiveTimer';
import LiveMeetingControl from '../../components/features/meetings/LiveMeetingControl';
import RoleDisplay from '../../components/features/meetings/RoleDisplay';
import NextUpDisplay from '../../components/features/meetings/NextUpDisplay';
import AttendanceTracker from '../../components/features/meetings/AttendanceTracker';

const LiveMeetingPage = () => {
  // Fetch live meeting state from Redux store

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <RoleDisplay role="Speaker 1" assignedTo="Kushal" />
        <LiveTimer />
        <LiveMeetingControl />
      </div>
      <div className="space-y-8">
        <NextUpDisplay />
        <AttendanceTracker />
      </div>
    </div>
  );
};

export default LiveMeetingPage;