import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGuest, useDeleteGuest } from '../../hooks/useGuests';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Card from '../../components/ui/Card';
import {

  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

const GuestProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { data: guest, isLoading } = useGuest(id!);
  const deleteGuestMutation = useDeleteGuest();

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteGuestMutation.mutateAsync(id);
      navigate('/guests');
    } catch (error) {
      // Error handled by hook
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="lg" text="Loading guest profile..." />
      </div>
    );
  }

  if (!guest) {
    return (
      <EmptyState
        title="Guest Not Found"
        message="The guest you're looking for doesn't exist."
      />
    );
  }

  const initials = guest.name.charAt(0).toUpperCase();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar initials={initials}  />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{guest.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                {guest.isToastmaster && <Badge color="blue">Toastmaster</Badge>}
              </div>
            </div>
          </div>
          <Button
            onClick={() => setShowDeleteConfirm(true)}
            isLoading={deleteGuestMutation.isPending}
          >
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete Guest
          </Button>
        </div>
      </div>

      {/* Contact Information */}
      <Card>
        <Card.Header>Contact Information</Card.Header>
        <Card.Body>
          <div className="space-y-3">
            {guest.email && (
              <div className="flex items-center gap-3 text-gray-700">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <span>{guest.email}</span>
              </div>
            )}
            {guest.phone && (
              <div className="flex items-center gap-3 text-gray-700">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <span>{guest.phone}</span>
              </div>
            )}
            {!guest.email && !guest.phone && (
              <p className="text-sm text-gray-500">No contact information available</p>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Home Club Information */}
      {guest.isToastmaster && (guest.homeClubName || guest.homeClubNumber) && (
        <Card>
          <Card.Header>Home Club Information</Card.Header>
          <Card.Body>
            <div className="space-y-3">
              {guest.homeClubName && (
                <div className="flex items-center gap-3 text-gray-700">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                  <span>{guest.homeClubName}</span>
                </div>
              )}
              {guest.homeClubNumber && (
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-sm text-gray-500">Club Number:</span>
                  <span className="font-medium">{guest.homeClubNumber}</span>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Guest Activity */}
      <Card>
        <Card.Header>Guest Activity</Card.Header>
        <Card.Body>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600">
                {guest.meetingIds?.length || 0}
              </p>
              <p className="text-sm text-gray-600">Meetings Attended</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {guest.rolesTaken || 0}
              </p>
              <p className="text-sm text-gray-600">Roles Taken</p>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Guest?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete {guest.name}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                isLoading={deleteGuestMutation.isPending}
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

export default GuestProfilePage;