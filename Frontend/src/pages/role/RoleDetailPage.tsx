import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserRoleHistory, useDeleteRoleHistory, useUpdateRoleHistory } from '../../hooks/useRoleHistory';
import { useAppSelector } from '../../store/hooks';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import {
  TrashIcon,
  CalendarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import RoleFeedback from '../../components/features/roleHistory/RoleFeedback';

const RoleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState<number>(0);

  const { data } = useUserRoleHistory(user?._id || '');
  const deleteRoleHistoryMutation = useDeleteRoleHistory();
  const updateRoleHistoryMutation = useUpdateRoleHistory(id!);

  const roleHistory = data?.data?.find(r => r._id === id);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteRoleHistoryMutation.mutateAsync(id);
      navigate('/roles');
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleUpdateFeedback = async () => {
    try {
      await updateRoleHistoryMutation.mutateAsync({
        feedback: feedback || undefined,
        rating: rating > 0 ? rating : undefined,
      });
      setIsEditing(false);
    } catch (error) {
      // Error handled by hook
    }
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="lg" text="Loading role details..." />
      </div>
    );
  }

  if (!roleHistory) {
    return (
      <EmptyState
        title="Role Not Found"
        message="The role you're looking for doesn't exist."
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{roleHistory.role}</h1>
              <Badge >Meeting Role</Badge>
            </div>
            <p className="text-gray-600">Performed by {roleHistory.participantName}</p>
          </div>
          <Button
            onClick={() => setShowDeleteConfirm(true)}
            isLoading={deleteRoleHistoryMutation.isPending}
          >
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Role Details */}
      <Card>
        <Card.Header>Role Information</Card.Header>
        <Card.Body>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Meeting</p>
                <p className="font-medium">{roleHistory.meetingId.theme}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ClockIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Date Performed</p>
                <p className="font-medium">
                  {new Date(roleHistory.completedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Feedback Section */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <span>Performance Feedback</span>
            {!isEditing && (
              <Button
                size="sm"
                onClick={() => {
                  setIsEditing(true);
                  setFeedback(roleHistory.feedback || '');
                  setRating(roleHistory.rating || 0);
                }}
              >
                Edit Feedback
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
                  Feedback
                </label>
                <Textarea
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter performance feedback..."
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleUpdateFeedback}
                  isLoading={updateRoleHistoryMutation.isPending}
                >
                  Save Feedback
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <RoleFeedback
              feedback={roleHistory.feedback}
              rating={roleHistory.rating}
            />
          )}
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Role Record?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this {roleHistory.role} record? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                isLoading={deleteRoleHistoryMutation.isPending}
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

export default RoleDetailPage;