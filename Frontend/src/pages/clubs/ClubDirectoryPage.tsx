// src/pages/clubs/ClubDirectoryPage.tsx
import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import ClubList from '../../components/features/clubs/ClubList';
import { Button } from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import { clubService } from '../../services/clubService';

const ClubDirectoryPage = () => {
  // Use React Query to fetch clubs
  const { 
    data: clubs = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['clubs'],
    queryFn: () => clubService.getMyClubs(),
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading clubs..." />
      </div>
    );
  }

if (error) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center space-y-4">
      <EmptyState
        title="Error Loading Clubs"
        message={error.message || "There was an error loading your clubs. Please try again."}
      />
      <Button onClick={() => refetch()}>
        Retry
      </Button>
    </div>
  );
}


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Clubs</h1>
            <p className="text-gray-600 mt-2">
              Manage your Toastmasters clubs and their activities
            </p>
          </div>
          <div className="flex space-x-3">
            <Link to="/onboarding/join-club">
              <Button >Join a Club</Button>
            </Link>
            <Link to="/onboarding/create-club">
              <Button>
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Club
              </Button>
            </Link>
          </div>
        </div>

{clubs.length === 0 ? (
  <div className="flex flex-col items-center space-y-6">
    <EmptyState
      title="No Clubs Yet"
      message="You haven't joined or created any clubs. Get started by creating a new club or joining an existing one."
    />
    <div className="flex flex-wrap gap-3 justify-center">
      <Link to="/onboarding/create-club">
        <Button>
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Your First Club
        </Button>
      </Link>
      <Link to="/onboarding/join-club">
        <Button >Join Existing Club</Button>
      </Link>
    </div>
  </div>
) : (
  <ClubList clubs={clubs} />
)}

      </div>
    </div>
  );
};

export default ClubDirectoryPage;