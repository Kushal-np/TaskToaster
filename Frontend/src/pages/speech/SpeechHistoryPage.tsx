import { Link } from 'react-router-dom';
import { useUserSpeeches } from '../../hooks/useSpeeches';
import { useAppSelector } from '../../store/hooks';
import SpeechList from '../../components/features/profile/SpeechList';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import {
  PlusIcon,
  MicrophoneIcon,
  TrophyIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const SpeechHistoryPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: speeches, isLoading, error } = useUserSpeeches(user?._id || '');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="lg" text="Loading speech history..." />
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Failed to Load Speeches"
        message="There was an error loading your speech history."
      />
    );
  }

  // Calculate statistics
  const totalSpeeches = speeches?.length || 0;
  const preparedSpeeches = speeches?.filter(s => s.speechType === 'prepared').length || 0;
  const evaluationSpeeches = speeches?.filter(s => s.speechType === 'evaluation').length || 0;
  const averageRating = speeches && speeches.length > 0
    ? speeches.reduce((acc, s) => acc + (s.evaluatorRating || 0), 0) / speeches.filter(s => s.evaluatorRating).length
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Speech History</h1>
          <p className="mt-1 text-sm text-gray-600">
            {totalSpeeches} speech{totalSpeeches === 1 ? '' : 'es'} delivered
          </p>
        </div>
        <Link to="/speeches/record">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Record Speech
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <Card.Body>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <MicrophoneIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalSpeeches}</p>
                <p className="text-sm text-gray-600">Total Speeches</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{preparedSpeeches}</p>
                <p className="text-sm text-gray-600">Prepared</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrophyIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{evaluationSpeeches}</p>
                <p className="text-sm text-gray-600">Evaluations</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrophyIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {averageRating > 0 ? averageRating.toFixed(1) : 'N/A'}
                </p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Speech List */}
      {speeches && speeches.length > 0 ? (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Speech Timeline
            </h2>
            <SpeechList speeches={speeches} />
          </div>
        </div>
      ) : (
        <EmptyState
          title="No Speeches Yet"
          message="You haven't recorded any speeches yet. Start your journey by recording your first speech!"
        />
      )}
    </div>
  );
};

export default SpeechHistoryPage;