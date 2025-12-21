import { Link } from 'react-router-dom';
import { useUserTableTopics } from '../../hooks/useTableTopics';
import { useAppSelector } from '../../store/hooks';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import {
  PlusIcon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import TableTopicList from '../../components/features/tableTopics/TableTopicList';

const TableTopicsHistoryPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: topics, isLoading, error } = useUserTableTopics(user?._id || '');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="lg" text="Loading table topics..." />
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Failed to Load Table Topics"
        message="There was an error loading your table topics history."
      />
    );
  }

  // Calculate statistics
  const totalTopics = topics?.length || 0;
  const averageRating = topics && topics.length > 0
    ? topics.reduce((acc, t) => acc + (t.rating || 0), 0) / topics.filter(t => t.rating).length
    : 0;
  
  // Calculate average duration (assuming format like "1 min 30 sec")
  const calculateAverageDuration = () => {
    if (!topics || topics.length === 0) return 'N/A';
    const durations = topics.map(t => {
      const match = t.duration.match(/(\d+)\s*min/);
      return match ? parseInt(match[1]) : 0;
    });
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
    return `${Math.round(avg)} min`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Table Topics</h1>
          <p className="mt-1 text-sm text-gray-600">
            {totalTopics} topic{totalTopics === 1 ? '' : 's'} completed
          </p>
        </div>
        <Link to="/table-topics/record">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Record Topic
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <Card.Body>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalTopics}</p>
                <p className="text-sm text-gray-600">Total Topics</p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {calculateAverageDuration()}
                </p>
                <p className="text-sm text-gray-600">Avg Duration</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <StarIcon className="h-6 w-6 text-yellow-600" />
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

      {/* Table Topics List */}
      {topics && topics.length > 0 ? (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Topics Timeline
            </h2>
            <TableTopicList topics={topics} />
          </div>
        </div>
      ) : (
        <EmptyState
          title="No Table Topics Yet"
          message="You haven't participated in any table topics sessions yet. Start by recording your first topic!"
        />
      )}

      {/* Progress Card */}
      {topics && topics.length > 0 && (
        <Card>
          <Card.Header>Your Table Topics Journey</Card.Header>
          <Card.Body>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                🎯 <strong>Goal:</strong> Practice impromptu speaking regularly
              </p>
              <p>
                📈 <strong>Progress:</strong> You've completed {totalTopics} table topics session{totalTopics === 1 ? '' : 's'}
              </p>
              <p>
                💡 <strong>Tip:</strong> Aim for 1-2 minutes per response for optimal practice
              </p>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default TableTopicsHistoryPage;