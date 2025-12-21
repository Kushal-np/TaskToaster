// src/components/features/meetings/NextUpDisplay.tsx
import { useSelector } from 'react-redux';
import { ForwardIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import type { RootState } from '../../../store/index';
import type { IAgendaItem } from '../../../types/meeting.types';

interface NextUpDisplayProps {
  agendaItems?: IAgendaItem[];
}

const NextUpDisplay = ({ agendaItems }: NextUpDisplayProps) => {
  const { currentAgendaItem } = useSelector((state: RootState) => state.liveMeeting);

  if (!agendaItems || agendaItems.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h4 className="text-lg font-semibold mb-3 text-gray-900">Next Up</h4>
        <p className="text-sm text-gray-500">No upcoming items</p>
      </div>
    );
  }

  const currentIndex = currentAgendaItem 
    ? agendaItems.findIndex(item => item._id === currentAgendaItem._id)
    : -1;

  // Get next 3 items
  const upcomingItems = agendaItems.slice(currentIndex + 1, currentIndex + 4);

  if (upcomingItems.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h4 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
          <ForwardIcon className="h-5 w-5 text-gray-400" />
          Next Up
        </h4>
        <div className="text-center py-8">
          <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-900">All items completed!</p>
          <p className="text-xs text-gray-500 mt-1">No more agenda items</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h4 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
        <ForwardIcon className="h-5 w-5 text-indigo-600" />
        Next Up
      </h4>
      
      <div className="space-y-3">
        {upcomingItems.map((item, index) => {
          const assignedName = typeof item.assignedTo === 'object' 
            ? item.assignedTo.name 
            : item.assignedToName;

          return (
            <div 
              key={item._id}
              className={`
                p-3 rounded-lg border-l-4 
                ${index === 0 
                  ? 'bg-indigo-50 border-indigo-500' 
                  : 'bg-gray-50 border-gray-300'
                }
              `}
            >
              {/* Position Badge */}
              {index === 0 && (
                <span className="inline-block px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full mb-2">
                  Up Next
                </span>
              )}

              {/* Role */}
              <div className="flex justify-between items-start mb-2">
                <h5 className={`font-semibold ${
                  index === 0 ? 'text-indigo-900' : 'text-gray-900'
                }`}>
                  {item.role}
                </h5>
                <span className="text-xs text-gray-500">{item.time}</span>
              </div>

              {/* Assigned To */}
              {assignedName && (
                <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-1">
                  <UserIcon className="h-3.5 w-3.5" />
                  <span>{assignedName}</span>
                </div>
              )}

              {/* Duration */}
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <ClockIcon className="h-3.5 w-3.5" />
                <span>{item.allocatedTime}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Remaining */}
      {agendaItems.length > currentIndex + 4 && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-gray-500 text-center">
            +{agendaItems.length - currentIndex - 4} more items after these
          </p>
        </div>
      )}
    </div>
  );
};

// Missing import
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default NextUpDisplay;