import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserSpeeches, useDeleteSpeech, useUpdateSpeech } from '../../hooks/useSpeeches';
import { useAppSelector } from '../../store/hooks';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import {
  TrashIcon,
  PencilIcon,
  ClockIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import SpeechEvaluation from '../../components/features/speeches/SpeechEvaluation';
import SpeechFeedback from '../../components/features/speeches/SpeechFeedback';

const SpeechDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEvaluationForm, setShowEvaluationForm] = useState(false);

  const { data: speeches, isLoading } = useUserSpeeches(user?._id || '');
  const deleteSpeechMutation = useDeleteSpeech();
  const updateSpeechMutation = useUpdateSpeech(id!);

  const speech = speeches?.find(s => s._id === id);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteSpeechMutation.mutateAsync(id);
      navigate('/speeches');
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleAddEvaluation = async (data: { feedback: string; rating: number }) => {
    try {
      await updateSpeechMutation.mutateAsync({
        evaluatorRating: data.rating,
      });
      setShowEvaluationForm(false);
    } catch (error) {
      // Error handled by hook
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="lg" text="Loading speech details..." />
      </div>
    );
  }

  if (!speech) {
    return (
      <EmptyState
        title="Speech Not Found"
        message="The speech you're looking for doesn't exist."
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
              <h1 className="text-2xl font-bold text-gray-900">{speech.title}</h1>
              <Badge>
                {speech.speechType}
              </Badge>
            </div>
            <p className="text-gray-600">Delivered by {speech.speakerName}</p>
          </div>
          <Button
            onClick={() => setShowDeleteConfirm(true)}
            isLoading={deleteSpeechMutation.isPending}
          >
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Speech Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Card.Header>Speech Information</Card.Header>
          <Card.Body>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Meeting</p>
                  <p className="font-medium">{speech.meetingId.theme}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{speech.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Delivered On</p>
                  <p className="font-medium">
                    {new Date(speech.completedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>

        {speech.pathwaysProject && (
          <Card>
            <Card.Header>Pathways Project</Card.Header>
            <Card.Body>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Pathway</p>
                  <p className="font-medium">{speech.pathwaysProject.pathway}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Level</p>
                  <p className="font-medium">{speech.pathwaysProject.level}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Project</p>
                  <p className="font-medium">{speech.pathwaysProject.projectName}</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        )}
      </div>

      {/* Evaluation Section */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <span>Evaluation</span>
            { !showEvaluationForm && (
              <Button
                size="sm"
                onClick={() => setShowEvaluationForm(true)}
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Add Evaluation
              </Button>
            )}
          </div>
        </Card.Header>
        <Card.Body>
          {showEvaluationForm ? (
            <div>
              <SpeechEvaluation
                onSubmit={handleAddEvaluation}
                isLoading={updateSpeechMutation.isPending}
              />
              <Button
                size="sm"
                className="mt-4"
                onClick={() => setShowEvaluationForm(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <SpeechFeedback
              rating={speech.evaluatorRating}
            />
          )}
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Speech?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete "{speech.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                isLoading={deleteSpeechMutation.isPending}
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

export default SpeechDetailPage;