// src/components/features/meetings/MeetingCalendar.tsx
import { useState, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, parseISO } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon, CalendarDaysIcon, PlusIcon, ClockIcon, MapPinIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { Button } from '../../ui/Button';
import { Link, useParams } from 'react-router-dom';
import { useAllClubMeetings } from '../../../hooks/useMeetings';
import EmptyState from '../../ui/EmptyState';
import LoadingSpinner from '../../shared/LoadingSpinner';
import type { MeetingStatus } from '../../../types';

const MeetingCalendar = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { meetings = [], isLoading } = useAllClubMeetings(clubId);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getMeetingsForDay = (day: Date) => {
    return meetings.filter(meeting => 
      isSameDay(parseISO(meeting.meetingDate), day)
    );
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Group meetings by day
  const meetingsByDay = useMemo(() => {
    const groups: Record<string, typeof meetings> = {};
    meetings.forEach(meeting => {
      const dateKey = format(parseISO(meeting.meetingDate), 'yyyy-MM-dd');
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(meeting);
    });
    return groups;
  }, [meetings]);

  // Get status color
  const getStatusColor = (status: MeetingStatus) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get meeting type icon
  const getMeetingTypeIcon = (meeting: any) => {
    if (meeting.isHybrid) return <VideoCameraIcon className="h-3 w-3 mr-1" />;
    if (meeting.onlineLink) return <VideoCameraIcon className="h-3 w-3 mr-1" />;
    return <MapPinIcon className="h-3 w-3 mr-1" />;
  };

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
          <h2 className="text-2xl font-bold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToNextMonth}>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Link to={`/meetings/create?clubId=${clubId}`}>
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            New Meeting
          </Button>
        </Link>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 border-b">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="bg-gray-50 py-3 text-center text-sm font-semibold text-gray-700">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {daysInMonth.map((day, index) => {
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isToday = isSameDay(day, new Date());
            const dayKey = format(day, 'yyyy-MM-dd');
            const dayMeetings = meetingsByDay[dayKey] || [];

            return (
              <div
                key={day.toString()}
                className={`
                  min-h-32 bg-white p-2 relative
                  ${!isCurrentMonth ? 'bg-gray-50' : ''}
                  ${isToday ? 'ring-2 ring-indigo-500 ring-inset' : ''}
                `}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`
                    text-sm font-medium
                    ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-900'}
                    ${isToday ? 'text-indigo-600' : ''}
                  `}>
                    {format(day, 'd')}
                  </span>
                  {isToday && (
                    <span className="text-xs px-1.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
                      Today
                    </span>
                  )}
                </div>

                {/* Meetings for this day */}
                <div className="space-y-1 mt-1">
                  {dayMeetings.slice(0, 3).map((meeting) => (
                    <Link
                      key={meeting._id}
                      to={`/meetings/${meeting._id}`}
                      className={`
                        block p-2 rounded text-xs border
                        ${getStatusColor(meeting.status as MeetingStatus)}
                        hover:opacity-90 transition-opacity
                      `}
                      title={meeting.theme}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">
                          Meeting #{meeting.meetingNumber}
                        </span>
                        <span className="text-xs opacity-75">
                          {format(parseISO(meeting.startTime), 'h:mm a')}
                        </span>
                      </div>
                      <div className="truncate text-xs mt-1">{meeting.theme}</div>
                      <div className="flex items-center mt-1 text-xs opacity-75">
                        {getMeetingTypeIcon(meeting)}
                        <span className="truncate">
                          {meeting.toastmasterOfDay && typeof meeting.toastmasterOfDay === 'object' 
                            ? meeting.toastmasterOfDay.name 
                            : 'TMoD'}
                        </span>
                      </div>
                    </Link>
                  ))}
                  {dayMeetings.length > 3 && (
                    <div className="text-xs text-gray-500 pl-2">
                      +{dayMeetings.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded mr-2"></div>
          <span className="text-gray-600">Scheduled</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded mr-2"></div>
          <span className="text-gray-600">In Progress</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-100 border border-green-300 rounded mr-2"></div>
          <span className="text-gray-600">Completed</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-100 border border-red-300 rounded mr-2"></div>
          <span className="text-gray-600">Cancelled</span>
        </div>
      </div>

      {/* Upcoming Meetings List */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Meetings</h3>
        {meetings.filter(m => m.status === 'scheduled' || m.status === 'in_progress').length === 0 ? (
          <EmptyState
            title="No Upcoming Meetings"
            message="Schedule a meeting to get started"
            icon={<CalendarDaysIcon className="h-12 w-12 text-gray-400" />}
          />
        ) : (
          <div className="space-y-3">
            {meetings
              .filter(m => m.status === 'scheduled' || m.status === 'in_progress')
              .sort((a, b) => new Date(a.meetingDate).getTime() - new Date(b.meetingDate).getTime())
              .slice(0, 5)
              .map((meeting) => (
                <Link
                  key={meeting._id}
                  to={`/meetings/${meeting._id}`}
                  className="block p-4 bg-white rounded-lg border hover:border-indigo-300 hover:shadow-sm transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(meeting.status as MeetingStatus)}`}>
                          {meeting.status}
                        </span>
                        <span className="text-sm text-gray-500">
                          #{meeting.meetingNumber}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900">{meeting.theme}</h4>
                      <div className="flex items-center text-sm text-gray-600 mt-1 space-x-4">
                        <div className="flex items-center">
                          <CalendarDaysIcon className="h-4 w-4 mr-1" />
                          {format(parseISO(meeting.meetingDate), 'EEE, MMM d')}
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {format(parseISO(meeting.startTime), 'h:mm a')}
                        </div>
                        {meeting.isHybrid && (
                          <div className="flex items-center">
                            <VideoCameraIcon className="h-4 w-4 mr-1" />
                            Hybrid
                          </div>
                        )}
                      </div>
                      {typeof meeting.toastmasterOfDay === 'object' && (
                        <div className="text-sm text-gray-500 mt-2">
                          Toastmaster: {meeting.toastmasterOfDay.name}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingCalendar;