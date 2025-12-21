// src/pages/clubs/ClubDashboardPage.tsx (updated with debugging)
import { useParams, Link } from 'react-router-dom';
import { 
  CalendarDaysIcon, 
  UserGroupIcon, 
  Cog6ToothIcon,
  PlusIcon 
} from '@heroicons/react/24/outline';
import ClubStats from '../../components/features/clubs/ClubStats';
import MemberList from '../../components/features/clubs/MemberList';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { clubService } from '../../services/clubService';
import { meetingService } from '../../services/meetingService';
import { useEffect } from 'react';

const ClubDashboardPage = () => {
  const { clubId } = useParams<{ clubId: string }>();
  
  console.log('🔍 ClubDashboardPage - clubId:', clubId); // Debug log
  
  // Fetch club details with error handling
  const { 
    data: club, 
    isLoading: isLoadingClub,
    error: clubError,
    isError: isClubError
  } = useQuery({
    queryKey: ['club', clubId],
    queryFn: () => clubService.getClubById(clubId!),
    enabled: !!clubId,
    retry: 1,
  });

  // Debug useEffect to see what's happening
  useEffect(() => {
    if (clubError) {
      console.error('❌ Error fetching club:', clubError);
    }
    if (club) {
      console.log('✅ Club data loaded:', club);
    }
  }, [club, clubError]);

  // Fetch club meetings
  const { 
    data: meetings = [], 
    isLoading: isLoadingMeetings 
  } = useQuery({
    queryKey: ['club-meetings', clubId],
    queryFn: () => meetingService.getClubMeetings(clubId!),
    enabled: !!clubId && !!club, // Only fetch if club exists
  });

  if (isLoadingClub) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading club details..." />
      </div>
    );
  }

if (isClubError || !club) {
  console.error('🚨 Club error or not found:', clubError);
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <EmptyState
        title="Club Not Found"
        message={
          clubError?.message ||
          "The club you're looking for doesn't exist or you don't have access to it."
        }
      />
      <Link to="/clubs">
        <Button>Back to My Clubs</Button>
      </Link>
    </div>
  );
}


  // For now, using minimal member data - in real app, fetch actual member details
  const mockMembers = club.members?.slice(0, 6).map((memberId, index) => ({
    _id: memberId,
    name: `Member ${index + 1}`,
    email: `member${index + 1}@example.com`,
  })) || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{club.clubName}</h1>
          <p className="text-gray-600 mt-1">
            Club #{club.clubNumber} • {club.region}, {club.district}
          </p>
        </div>
        <div className="flex space-x-3">
          <Link to={`/clubs/${clubId}/calendar`}>
            <Button >
              <CalendarDaysIcon className="h-5 w-5 mr-2" />
              Calendar
            </Button>
          </Link>
          <Link to={`/clubs/${clubId}/settings`}>
            <Button >
              <Cog6ToothIcon className="h-5 w-5 mr-2" />
              Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to={`/meetings/create?clubId=${clubId}`}
          className="block p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors text-center"
        >
          <PlusIcon className="h-8 w-8 mx-auto text-gray-400" />
          <p className="mt-2 font-medium text-gray-900">Create Meeting</p>
          <p className="text-sm text-gray-500">Schedule a new meeting</p>
        </Link>
        <Link
          to={`/clubs/${clubId}/members`}
          className="block p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center"
        >
          <UserGroupIcon className="h-8 w-8 mx-auto text-gray-400" />
          <p className="mt-2 font-medium text-gray-900">Manage Members</p>
          <p className="text-sm text-gray-500">Invite and manage members</p>
        </Link>
      </div>

      {/* Stats */}
      <ClubStats 
        totalMembers={club.members?.length || 0} 
        totalMeetings={meetings.length}
      />

      {/* Recent Members */}
      <MemberList members={mockMembers} />

      {/* Club Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-medium text-gray-900 mb-4">Club Information</h3>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm text-gray-500">Region</dt>
              <dd className="text-sm font-medium">{club.region}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">District</dt>
              <dd className="text-sm font-medium">{club.district}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Division</dt>
              <dd className="text-sm font-medium">{club.division}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Area</dt>
              <dd className="text-sm font-medium">{club.area}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Chartered Date</dt>
              <dd className="text-sm font-medium">
                {new Date(club.charteredDate).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-medium text-gray-900 mb-4">Recent Meetings</h3>
          {isLoadingMeetings ? (
            <p className="text-sm text-gray-500">Loading meetings...</p>
          ) : meetings.length > 0 ? (
            <div className="space-y-2">
              {meetings.slice(0, 5).map((meeting) => (
                <Link
                  key={meeting._id}
                  to={`/meetings/${meeting._id}`}
                  className="block text-sm text-indigo-600 hover:text-indigo-500"
                >
                  {meeting.theme} - {new Date(meeting.meetingDate).toLocaleDateString()}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No recent meetings</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubDashboardPage;