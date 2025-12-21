// src/pages/onboarding/SetupCompletePage.tsx
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const SetupCompletePage = () => {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <Card className="text-center">
        <Card.Body className="p-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircleIcon className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Setup Complete!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Your club has been successfully set up and is ready to use.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="font-medium text-gray-900 mb-3">Next Steps</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                <span>Schedule your first meeting</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                <span>Invite members to join</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                <span>Set up meeting roles and templates</span>
              </div>
            </div>
          </div>
          
          <div className="space-x-4">
            <Link to="/clubs">
              <Button>
                Go to My Clubs
              </Button>
            </Link>
            <Link to="/meetings/create">
              <Button >
                Schedule First Meeting
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SetupCompletePage;