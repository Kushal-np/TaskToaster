// src/pages/meetings/MeetingCalendarPage.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import { useAllClubMeetings } from '../../hooks/useMeetings';
import { useClubs } from '../../hooks/useClubs';
import MeetingList from '../../components/features/meetings/MeetingList';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import Select from '../../components/ui/Select';

const MeetingCalendarPage = () => {
  const { data: clubs, isLoading: clubsLoading } = useClubs();
  const [selectedClubId, setSelectedClubId] = useState<string>('');

  // Auto-select first club when clubs load
  useEffect(() => {
    if (clubs && clubs.length > 0 && !selectedClubId) {
      setSelectedClubId(clubs[0]._id);
    }
  }, [clubs, selectedClubId]);

  const { data: meetings, isLoading: meetingsLoading } = useAllClubMeetings(selectedClubId);

  if (clubsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading clubs..." />
      </div>
    );
  }

  if (!clubs || clubs.length === 0) {
    return (
      <EmptyState
        title="No Clubs Found"
        message="You need to join or create a club before viewing meetings."
        action={
          <div className="flex gap-3">
            <Link to="/onboarding/create-club">
              <Button>Create Club</Button>
            </Link>
            <Link to="/onboarding/join-club">
              <Button variant="outline">Join Club</Button>
            </Link>
          </div>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meetings</h1>
          <p className="text-gray-600 mt-1">View and manage all your meetings</p>
        </div>
        <Link to={selectedClubId ? `/meetings/create/${selectedClubId}` : '/clubs'}>
          <Button>
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Meeting
          </Button>
        </Link>
      </div>

      {/* Club Selector */}
      <div className="max-w-xs">
        <label htmlFor="club-select" className="block text-sm font-medium text-gray-700 mb-1">
          Select Club
        </label>
        <Select
          id="club-select"
          value={selectedClubId}
          onChange={(e) => setSelectedClubId(e.target.value)}
        >
          <option value="">Select a club...</option>
          {clubs.map((club) => (
            <option key={club._id} value={club._id}>
              {club.clubName}
            </option>
          ))}
        </Select>
      </div>

      {/* Meetings List */}
      {meetingsLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <LoadingSpinner size="lg" text="Loading meetings..." />
        </div>
      ) : selectedClubId ? (
        <MeetingList meetings={meetings || []} />
      ) : (
        <EmptyState
          title="Select a Club"
          message="Please select a club to view its meetings"
        />
      )}
    </div>
  );
};

export default MeetingCalendarPage;