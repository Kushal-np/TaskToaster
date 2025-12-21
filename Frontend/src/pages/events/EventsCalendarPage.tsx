// src/pages/events/EventsCalendarPage.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useClubs } from '../../hooks/useClubs';
import * as eventService from '../../services/eventService';
import EventList from '../../components/features/events/EventList';
import EventCalendar from '../../components/features/events/EventCalendar';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import { PlusIcon, ListBulletIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

const EventsCalendarPage = () => {
  const { data: clubs, isLoading: clubsLoading } = useClubs();
  const [selectedClubId, setSelectedClubId] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [filterUpcoming, setFilterUpcoming] = useState(false);
  const [filterEventType, setFilterEventType] = useState<string>('');

  // Fetch all events across all clubs
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['all-events', selectedClubId, filterUpcoming, filterEventType],
    queryFn: async () => {
      if (!clubs || clubs.length === 0) return [];

      // If "all" is selected, fetch events from all clubs
      if (selectedClubId === 'all') {
        const allClubEvents = await Promise.all(
          clubs.map((club) =>
            eventService.getClubEvents(
              club._id,
              filterUpcoming || undefined,
              filterEventType || undefined
            )
          )
        );
        // Flatten the array of arrays and sort by date
        return allClubEvents.flat().sort((a, b) => 
          new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
        );
      } else {
        // Fetch events for the selected club
        return eventService.getClubEvents(
          selectedClubId,
          filterUpcoming || undefined,
          filterEventType || undefined
        );
      }
    },
    enabled: !!clubs && clubs.length > 0,
  });

  const isLoading = clubsLoading || eventsLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="lg" text="Loading events..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <p className="mt-1 text-sm text-gray-600">
            {events?.length || 0} {events?.length === 1 ? 'event' : 'events'} found
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/events/create">
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="flex-1">
              <label htmlFor="club-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Club
              </label>
              <Select
                id="club-filter"
                value={selectedClubId}
                onChange={(e) => setSelectedClubId(e.target.value)}
                className="w-full"
                disabled={!clubs || clubs.length === 0}
              >
                <option value="all">All Clubs</option>
                {clubs?.map((club) => (
                  <option key={club._id} value={club._id}>
                    {club.clubName}
                  </option>
                ))}
              </Select>
            </div>

            <div className="flex-1">
              <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Event Type
              </label>
              <Select
                id="type-filter"
                value={filterEventType}
                onChange={(e) => setFilterEventType(e.target.value)}
                className="w-full"
              >
                <option value="">All Types</option>
                <option value="workshop">Workshop</option>
                <option value="contest">Contest</option>
                <option value="meeting">Meeting</option>
                <option value="social">Social</option>
                <option value="other">Other</option>
              </Select>
            </div>

            <div className="flex items-end pb-2">
              <div className="flex items-center">
                <input
                  id="upcoming-filter"
                  type="checkbox"
                  checked={filterUpcoming}
                  onChange={(e) => setFilterUpcoming(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="upcoming-filter" className="ml-2 text-sm text-gray-700">
                  Upcoming only
                </label>
              </div>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${
                viewMode === 'list'
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              title="List View"
            >
              <ListBulletIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded ${
                viewMode === 'calendar'
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              title="Calendar View"
            >
              <CalendarDaysIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {!events || events.length === 0 ? (
        <EmptyState
          title="No Events Found"
          message={
            filterUpcoming || filterEventType || selectedClubId !== 'all'
              ? "No events match your filter criteria."
              : !clubs || clubs.length === 0
              ? "You need to join a club first to see events."
              : "There are no events scheduled yet. Create one to get started!"
          }
        />
      ) : viewMode === 'list' ? (
        <EventList events={events} />
      ) : (
        <EventCalendar />
      )}

      {/* Stats Footer */}
      {events && events.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{events.length}</p>
              <p className="text-sm text-gray-600">Total Events</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {events.filter(e => e.eventType === 'workshop').length}
              </p>
              <p className="text-sm text-gray-600">Workshops</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {events.filter(e => e.eventType === 'contest').length}
              </p>
              <p className="text-sm text-gray-600">Contests</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {events.filter(e => new Date(e.eventDate) > new Date()).length}
              </p>
              <p className="text-sm text-gray-600">Upcoming</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsCalendarPage;