// src/pages/clubs/ClubCalendarPage.tsx
import { useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import MeetingCalendar from '../../components/features/meetings/MeetingCalendar';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import { useQuery } from '@tanstack/react-query';
import { clubService } from '../../services/clubService';

const ClubCalendarPage = () => {
  const { clubId } = useParams<{ clubId: string }>();
  
  const { data: club, isLoading } = useQuery({
    queryKey: ['club', clubId],
    queryFn: () => clubService.getClubById(clubId!),
    enabled: !!clubId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading calendar..." />
      </div>
    );
  }

  if (!club) {
    return (
      <EmptyState
        title="Club Not Found"
        message="The club you're looking for doesn't exist or you don't have access."
        action={
          <Link to="/clubs">
            <Button>Back to My Clubs</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            to={`/clubs/${clubId}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Club
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{club.clubName} Calendar</h1>
            <p className="text-gray-600 mt-1">
              View and manage all meetings for {club.clubName}
            </p>
          </div>
        </div>
      </div>

      <MeetingCalendar clubId={clubId} />
    </div>
  );
};

export default ClubCalendarPage;