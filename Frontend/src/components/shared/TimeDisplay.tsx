interface TimeDisplayProps {
  date: Date | string;
}

const TimeDisplay = ({ date }: TimeDisplayProps) => {
  const timeString = new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return <span>{timeString}</span>;
};

export default TimeDisplay;