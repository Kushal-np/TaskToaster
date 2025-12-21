// src/components/features/meetings/AgendaRow.tsx
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import type { IAgendaItem } from '../../../types/meeting.types';

interface AgendaRowProps {
  item: IAgendaItem;
  showActions?: boolean;
  onEdit?: (item: IAgendaItem) => void;
  onDelete?: (itemId: string) => void;
  onToggleComplete?: (itemId: string, completed: boolean) => void;
}

const AgendaRow = ({ 
  item, 
  showActions = false,
  onEdit,
  onDelete,
  onToggleComplete 
}: AgendaRowProps) => {
  const assignedName = typeof item.assignedTo === 'object' 
    ? item.assignedTo.name 
    : item.assignedToName;

  return (
    <div 
      className={`
        flex items-center gap-4 p-4 border rounded-lg
        ${item.isCompleted ? 'bg-green-50 border-green-200' : 'bg-white hover:bg-gray-50'}
        transition-colors
      `}
    >
      {/* Completion Checkbox */}
      {onToggleComplete && (
        <button
          onClick={() => onToggleComplete(item._id, !item.isCompleted)}
          className="shrink"
        >
          <CheckCircleIcon 
            className={`h-6 w-6 ${
              item.isCompleted 
                ? 'text-green-600' 
                : 'text-gray-300 hover:text-gray-500'
            }`}
          />
        </button>
      )}

      {/* Sequence Number */}
      <div className="shrink w-8 text-center">
        <span className="text-sm font-bold text-gray-500">#{item.sequence}</span>
      </div>

      {/* Content Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-3">
        {/* Time */}
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Time</p>
          <div className="flex items-center gap-1">
            <ClockIcon className="h-3 w-3 text-gray-400" />
            <p className={`font-medium text-sm ${item.isCompleted ? 'line-through text-gray-500' : ''}`}>
              {item.time}
            </p>
          </div>
        </div>

        {/* Role */}
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Role</p>
          <p className={`font-semibold text-sm ${item.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {item.role}
          </p>
        </div>

        {/* Assigned To */}
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Assigned To</p>
          {assignedName ? (
            <div>
              <p className={`font-medium text-sm ${item.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {assignedName}
              </p>
              <p className="text-xs text-gray-400">
                ({item.assignedToModel === 'Guest' ? 'Guest' : 'Member'})
              </p>
            </div>
          ) : (
            <span className="italic text-gray-400 text-sm">Unassigned</span>
          )}
        </div>

        {/* Duration */}
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Duration</p>
          <p className={`font-medium text-sm ${item.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {item.allocatedTime}
          </p>
          {item.actualDuration && (
            <p className="text-xs text-green-600">
              Actual: {item.actualDuration}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      {showActions && (onEdit || onDelete) && (
        <div className="shrink flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(item)}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(item._id)}
              className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AgendaRow;