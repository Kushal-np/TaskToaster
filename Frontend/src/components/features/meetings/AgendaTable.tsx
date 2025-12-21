// src/components/features/meetings/AgendaTable.tsx
import EmptyState from '../../ui/EmptyState';
import AgendaRow from './AgendaRow';
import type { IAgendaItem } from '../../../types/meeting.types';

interface AgendaTableProps {
  items: IAgendaItem[];
  showActions?: boolean;
  onEdit?: (item: IAgendaItem) => void;
  onDelete?: (itemId: string) => void;
  onToggleComplete?: (itemId: string, completed: boolean) => void;
  isLiveMode?: boolean;
}

const AgendaTable = ({ 
  items, 
  showActions = false,
  onEdit,
  onDelete,
  onToggleComplete,
  isLiveMode = false
}: AgendaTableProps) => {
  if (!items || items.length === 0) {
    return (
      <EmptyState 
        title="No Agenda Items" 
        message="This meeting's agenda is empty. Add items to get started."
      />
    );
  }

  // Sort by sequence
  const sortedItems = [...items].sort((a, b) => a.sequence - b.sequence);

  // Calculate total time
  const totalMinutes = sortedItems.reduce((sum, item) => {
    const match = item.allocatedTime.match(/(\d+)/);
    return sum + (match ? parseInt(match[1]) : 0);
  }, 0);

  return (
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="flex justify-between items-center pb-3 border-b">
        <div>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">{items.length}</span> agenda items
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">
            Total time: <span className="font-semibold">{totalMinutes} minutes</span>
          </p>
        </div>
      </div>

      {/* Agenda Items */}
      <div className="space-y-2">
        {sortedItems.map((item, index) => (
          <div key={item._id} className="relative">
            {/* Current Item Indicator (Live Mode) */}
            {isLiveMode && !item.isCompleted && index === 0 && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
            )}
            
            <AgendaRow
              item={item}
              showActions={showActions}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
            />
          </div>
        ))}
      </div>

      {/* Completion Progress */}
      {isLiveMode && (
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-600">
              {sortedItems.filter(i => i.isCompleted).length} / {sortedItems.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(sortedItems.filter(i => i.isCompleted).length / sortedItems.length) * 100}%`
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendaTable;