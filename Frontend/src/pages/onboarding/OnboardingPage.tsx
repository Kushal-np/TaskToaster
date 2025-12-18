import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

const OnboardingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800">Let's Get Started</h1>
      <p className="mt-4 text-lg text-gray-600">Are you creating a new club or joining an existing one?</p>
      <div className="mt-8 flex space-x-4">
        <Link to="/onboarding/create-club">
          <Button size="lg">Create a Club</Button>
        </Link>
        <Link to="/onboarding/join-club">
          <Button size="lg" variant="secondary">Join a Club</Button>
        </Link>
      </div>
    </div>
  );
};

export default OnboardingPage;