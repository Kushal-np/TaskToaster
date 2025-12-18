interface DateDisplayProps {
  date: Date | string;
}

const DateDisplay = ({ date }: DateDisplayProps) => {
  const dateString = new Date(date).toLocaleDateString();
  return <span>{dateString}</span>;
};

export default DateDisplay;