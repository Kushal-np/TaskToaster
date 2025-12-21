// src/components/features/meetings/RoleDisplay.tsx
import { useSelector } from 'react-redux';
import { UserCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import type { RootState } from '../../../store/index';

interface RoleDisplayProps {
  role?: string;
  assignedTo?: string;
  allocatedTime?: string;
}

const RoleDisplay = ({ role, assignedTo, allocatedTime }: RoleDisplayProps) => {
  const { currentAgendaItem } = useSelector((state: RootState) => state.liveMeeting);

  // Use Redux state if no props provided
  const displayRole = role || currentAgendaItem?.role || 'No Role Selected';
  const displayAssignedTo = assignedTo || currentAgendaItem?.assignedToName || 'Unassigned';
  const displayTime = allocatedTime || currentAgendaItem?.allocatedTime || '--';

  return (
    <div className="relative bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg shadow-2xl overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      {/* Content */}
      <div className="relative text-center p-12">
        {/* Label */}
        <p className="text-sm uppercase tracking-widest text-indigo-200 font-medium mb-4">
          Current Role
        </p>

        {/* Role Name */}
        <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
          {displayRole}
        </h2>

        {/* Assigned Person */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <UserCircleIcon className="h-8 w-8 text-indigo-200" />
          <h3 className="text-3xl text-indigo-100 font-medium">
            {displayAssignedTo}
          </h3>
        </div>

        {/* Allocated Time */}
        <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-indigo-400/30">
          <ClockIcon className="h-5 w-5 text-indigo-200" />
          <p className="text-xl text-indigo-200">
            <span className="font-semibold">{displayTime}</span> allocated
          </p>
        </div>

        {/* Status Indicator */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-white font-medium">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleDisplay;