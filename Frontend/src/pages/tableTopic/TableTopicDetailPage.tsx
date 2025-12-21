import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserTableTopics, useDeleteTableTopic, useUpdateTableTopic } from '../../hooks/useTableTopics';
import { useAppSelector } from '../../store/hooks';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import {
  TrashIcon,
  CalendarIcon,
  ClockIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

const TableTopicDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState<number>(0);

  const { data: topics, isLoading } = useUserTableTopics(user?._id || '');
  const deleteTableTopicMutation = useDeleteTableTopic();
  const updateTableTopicMutation = useUpdateTableTopic(id!);

  const topic = topics?.find(t => t._id === id);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteTableTopicMutation.mutateAsync(id);
      navigate('/table-topics');
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleUpdate = async () => {
    try {
      await updateTableTopicMutation.mutateAsync({
        rating: rating > 0 ? rating : undefined,
      });
      setIsEditing(false);
    } catch (error) {
      // Error handled by hook
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="lg" text="Loading topic details..." />
      </div>
    );
  }

  if (!topic) {
    return (
      <EmptyState
        title="Table Topic Not Found"
        message="The table topic you're looking for doesn't exist."
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              "{topic.topic}"
            </h1>
            <p className="text-gray-600">
              Delivered by {topic.participantName}
            </p>
          </div>
          <Button
            onClick={() => setShowDeleteConfirm(true)}
            isLoading={deleteTableTopicMutation.isPending}
          >
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Topic Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Card.Header>Session Information</Card.Header>
          <Card.Body>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Meeting</p>
                  <p className="font-medium">{topic.meetingId.theme}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{topic.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">
                    {new Date(topic.completedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>Performance</Card.Header>
          <Card.Body>
            <div className="flex items-center gap-3">
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-500">Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {topic.rating ? `${topic.rating}/5` : 'Not rated'}
                </p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Notes Section */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <span>Notes & Feedback</span>
            {!isEditing && (
              <Button
                size="sm"
                onClick={() => {
                  setIsEditing(true);
                  setRating(topic.rating || 0);
                }}
              >
                Edit Notes
              </Button>
            )}
          </div>
        </Card.Header>
        <Card.Body>
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (1-5)
                </label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={rating || ''}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <Textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your notes about this table topic session..."
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleUpdate}
                  isLoading={updateTableTopicMutation.isPending}
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            null
          )}
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Table Topic?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this table topic record? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                isLoading={deleteTableTopicMutation.isPending}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableTopicDetailPage;