interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'away' | 'scheduled' | 'completed';
  className?: string;
}

const StatusIndicator = ({ status, className }: StatusIndicatorProps) => {
  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    scheduled: 'bg-blue-500',
    completed: 'bg-green-500',
  };

  return (
    <span className={`h-2.5 w-2.5 rounded-full ${statusClasses[status]} ${className}`} />
  );
};

export default StatusIndicator;