// src/components/features/meetings/MeetingCalendar.tsx
import { useState, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAllClubMeetings } from '../../hooks/useMeetings';
import type { IMeeting } from '../../types/meeting.types';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { Button } from '../../components/ui/Button';

interface MeetingCalendarProps {
  clubId: string;
}

const MeetingCalendar = ({ clubId }: MeetingCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: meetings = [], isLoading } = useAllClubMeetings(clubId);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  console.log(daysInMonth)
  const getMeetingsForDay = (day: Date) =>
    meetings.filter((meeting) => isSameDay(parseISO(meeting.meetingDate), day));
  console.log(getMeetingsForDay)
  const goToPreviousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const goToNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  const meetingsByDay = useMemo(() => {
    const groups: Record<string, IMeeting[]> = {};
    meetings.forEach((meeting) => {
      const dateKey = format(parseISO(meeting.meetingDate), 'yyyy-MM-dd');
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(meeting);
    });
    return groups;
  }, [meetings]);
  console.log(meetingsByDay);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="lg" text="Loading calendar..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900">{format(currentDate, 'MMMM yyyy')}</h2>
          <div className="flex items-center space-x-2">
            <Button size="sm" onClick={goToToday}>Today</Button>
            <Button size="sm" onClick={goToPreviousMonth}><ChevronLeftIcon className="h-4 w-4" /></Button>
            <Button size="sm" onClick={goToNextMonth}><ChevronRightIcon className="h-4 w-4" /></Button>
          </div>
        </div>
        <Link to={`/meetings/create?clubId=${clubId}`}>
          <Button><PlusIcon className="h-4 w-4 mr-2" />New Meeting</Button>
        </Link>
      </div>

      {/* Calendar grid here ... (same as your previous code) */}
<MeetingCalendar clubId={clubId!} />
    </div>
  );
};

export default MeetingCalendar;
