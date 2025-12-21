// src/pages/onboarding/OnboardingPage.tsx
import { Link } from 'react-router-dom';
import { 
  UserPlusIcon, 
  BuildingLibraryIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { useClub } from '../../hooks/useClubs';

const OnboardingPage = () => {
  const { data:clubs, isLoading } = useClub();
  console.log(clubs)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" text="Checking your clubs..." />
      </div>
    );
  }



  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Task Toaster!
        </h1>
        <p className="text-xl text-gray-600">
          Get started by creating or joining a Toastmasters club
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="hover:shadow-lg transition-shadow">
          <Card.Body className="text-center p-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
              <BuildingLibraryIcon className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Create a New Club
            </h2>
            <p className="text-gray-600 mb-6">
              Start your own Toastmasters club. Perfect for new clubs or if you're
              starting fresh in your community.
            </p>
            <div className="space-y-3 text-left mb-6">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                <span>Set up your club profile</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                <span>Customize meeting templates</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                <span>Invite members to join</span>
              </div>
            </div>
            <Link to="/onboarding/create-club">
              <Button className="w-full">
                Create New Club
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </Card.Body>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <Card.Body className="text-center p-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
              <UserPlusIcon className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Join Existing Club
            </h2>
            <p className="text-gray-600 mb-6">
              Join a club that's already using Task Toaster. You'll need the club
              number from your club president or VP Membership.
            </p>
            <div className="space-y-3 text-left mb-6">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                <span>Access existing meeting schedules</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                <span>Connect with club members</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                <span>Track your progress</span>
              </div>
            </div>
            <Link to="/onboarding/join-club">
              <Button  className="w-full">
                Join Existing Club
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-500">
          Not sure which option to choose?{' '}
          <Link to="/help" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Get help choosing
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OnboardingPage;