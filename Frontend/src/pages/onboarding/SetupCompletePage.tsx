import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { CheckCircleIcon } from 'lucide-react';

const SetupCompletePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <CheckCircleIcon className="h-24 w-24 text-green-500" />
      <h1 className="mt-4 text-4xl font-bold text-gray-800">Setup Complete!</h1>
      <p className="mt-2 text-lg text-gray-600">You're all set. Welcome to Task Toaster.</p>
      <Link to="/dashboard" className="mt-8">
        <Button size="lg">Go to Dashboard</Button>
      </Link>
    </div>
  );
};

export default SetupCompletePage;