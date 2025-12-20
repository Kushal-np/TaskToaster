// src/pages/meetings/MeetingDetailPage.tsx
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  CalendarDaysIcon, 
  ClockIcon, 
  MapPinIcon, 
  VideoCameraIcon, 
  UserIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlayCircleIcon,
  ChatBubbleLeftRightIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import { format, parseISO } from 'date-fns';
import { Button } from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { useMeeting, useUpdateMeetingStatus, useDeleteMeeting } from '../../hooks/useMeetings';
import { MeetingStatus } from '../../types';

const MeetingDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // CORRECT: Destructure data from the query hook
  const { data: meeting, isLoading, refetch } = useMeeting(id);
  const { mutateAsync: updateStatus, isPending: isUpdatingStatus } = useUpdateMeetingStatus();
  const { mutate: deleteMeeting, isPending: isDeleting } = useDeleteMeeting();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Debug logging
  console.log('🔍 MeetingDetailPage - ID:', id);
  console.log('🔍 MeetingDetailPage - Meeting:', meeting);
  console.log('🔍 MeetingDetailPage - Loading:', isLoading);

  const handleStatusChange = async (newStatus: MeetingStatus) => {
    if (!id) return;
    try {
      await updateStatus({ meetingId: id, status: newStatus });
      refetch();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteMeeting(id);
      navigate('/clubs');
    } catch (error) {
      console.error('Error deleting meeting:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const configs: Record<string, { color: string; Icon?: any }> = {
      draft: { color: 'bg-gray-100 text-gray-800' },
      scheduled: { color: 'bg-blue-100 text-blue-800', Icon: CalendarDaysIcon },
      in_progress: { color: 'bg-yellow-100 text-yellow-800', Icon: PlayCircleIcon },
      completed: { color: 'bg-green-100 text-green-800', Icon: CheckCircleIcon },
      cancelled: { color: 'bg-red-100 text-red-800', Icon: XCircleIcon },
    };

    const config = configs[status] || configs.draft;
    const Icon = config.Icon;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {Icon && <Icon className="h-4 w-4 mr-1" />}
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading meeting details..." />
      </div>
    );
  }

  if (!meeting) {
    return (
      <EmptyState
        title="Meeting Not Found"
        message="The meeting you're looking for doesn't exist or you don't have access."
        action={
          <Link to="/clubs">
            <Button>Back to Clubs</Button>
          </Link>
        }
      />
    );
  }

  const club = typeof meeting.clubId === 'object' ? meeting.clubId : null;
  const toastmaster = typeof meeting.toastmasterOfDay === 'object' ? meeting.toastmasterOfDay : null;
  const creator = typeof meeting.createdBy === 'object' ? meeting.createdBy : null;
  const resourceLinks = meeting.resourceLinks || [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <Link 
          to={club ? `/clubs/${club._id}` : '/clubs'}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          {club ? `Back to ${club.clubName}` : 'Back to Clubs'}
        </Link>
      </div>

      <div className="space-y-6">
        {/* Meeting Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{meeting.theme}</h1>
              {getStatusBadge(meeting.status)}
            </div>
            <p className="text-gray-600">
              Meeting #{meeting.meetingNumber} • {club?.clubName || 'Unknown Club'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to={`/meetings/${id}/edit`}>
              <Button variant="outline">
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
            
            {meeting.status === 'scheduled' && (
              <Button
                onClick={() => handleStatusChange(MeetingStatus.IN_PROGRESS)}
                isLoading={isUpdatingStatus}
              >
                <PlayCircleIcon className="h-4 w-4 mr-2" />
                Start Meeting
              </Button>
            )}
            {meeting.status === 'in_progress' && (
              <Button
                onClick={() => handleStatusChange(MeetingStatus.COMPLETED)}
                isLoading={isUpdatingStatus}
              >
                <CheckCircleIcon className="h-4 w-4 mr-2" />
                Complete
              </Button>
            )}

            {meeting.status === 'draft' && (
              <Button
                variant="danger"
                onClick={() => setShowDeleteConfirm(true)}
                isLoading={isDeleting}
              >
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete
              </Button>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date & Time */}
            <Card>
              <Card.Header>
                <h3 className="font-medium text-gray-900">Date & Time</h3>
              </Card.Header>
              <Card.Body className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CalendarDaysIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {format(parseISO(meeting.meetingDate), 'EEEE, MMMM d, yyyy')}
                    </p>
                    <p className="text-sm text-gray-600">Meeting Date</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ClockIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{meeting.startTime}</p>
                    <p className="text-sm text-gray-600">Start Time</p>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Location */}
            <Card>
              <Card.Header>
                <h3 className="font-medium text-gray-900">
                  {meeting.isHybrid ? 'Hybrid Meeting Location' : 'Meeting Location'}
                </h3>
              </Card.Header>
              <Card.Body className="space-y-4">
                {meeting.venue && (
                  <div className="flex items-start space-x-3">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{meeting.venue}</p>
                      {meeting.venueLink && (
                        <a
                          href={meeting.venueLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-indigo-600 hover:text-indigo-500 inline-flex items-center mt-1"
                        >
                          <LinkIcon className="h-3 w-3 mr-1" />
                          View on Map
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {(meeting.onlineLink || meeting.isHybrid) && (
                  <div className="flex items-start space-x-3">
                    <VideoCameraIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Online Meeting</p>
                      {meeting.onlineLink ? (
                        <a
                          href={meeting.onlineLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-indigo-600 hover:text-indigo-500 block mt-1"
                        >
                          Join Online Meeting
                        </a>
                      ) : (
                        <p className="text-sm text-gray-600 mt-1">Link will be provided</p>
                      )}
                      {(meeting.onlineMeetingId || meeting.onlinePasscode) && (
                        <div className="mt-2 p-3 bg-gray-50 rounded text-sm space-y-1">
                          {meeting.onlineMeetingId && (
                            <p>
                              <span className="text-gray-600">Meeting ID: </span>
                              <span className="font-medium">{meeting.onlineMeetingId}</span>
                            </p>
                          )}
                          {meeting.onlinePasscode && (
                            <p>
                              <span className="text-gray-600">Passcode: </span>
                              <span className="font-medium">{meeting.onlinePasscode}</span>
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* Agenda */}
            <Card>
              <Card.Header>
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">Meeting Agenda</h3>
                  <Link to={`/meetings/${id}/agenda`}>
                    <Button size="sm" variant="outline">
                      Edit Agenda
                    </Button>
                  </Link>
                </div>
              </Card.Header>
              <Card.Body>
                {meeting.agendaItems && meeting.agendaItems.length > 0 ? (
                  <div className="space-y-3">
                    {meeting.agendaItems.map((item: any) => (
                      <div key={item._id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{item.title}</p>
                            <p className="text-sm text-gray-600">{item.role}</p>
                          </div>
                          <p className="font-medium text-gray-900">{item.duration} min</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No agenda items yet</p>
                    <Link to={`/meetings/${id}/agenda`}>
                      <Button variant="outline" className="mt-2">
                        Create Agenda
                      </Button>
                    </Link>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Toastmaster */}
            <Card>
              <Card.Header>
                <h3 className="font-medium text-gray-900">Toastmaster of the Day</h3>
              </Card.Header>
              <Card.Body>
                {toastmaster ? (
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{toastmaster.name}</p>
                      <p className="text-sm text-gray-600">{toastmaster.email}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">Not assigned yet</p>
                )}
              </Card.Body>
            </Card>

            {/* Communication */}
            {(meeting.whatsappLink || resourceLinks.length > 0) && (
              <Card>
                <Card.Header>
                  <h3 className="font-medium text-gray-900">
                    <ChatBubbleLeftRightIcon className="h-5 w-5 inline mr-2" />
                    Communication & Resources
                  </h3>
                </Card.Header>
                <Card.Body className="space-y-3">
                  {meeting.whatsappLink && (
                    <a
                      href={meeting.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-indigo-600 hover:text-indigo-500 p-2 hover:bg-indigo-50 rounded"
                    >
                      <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                      WhatsApp Group
                    </a>
                  )}

                  {resourceLinks.length > 0 && (
                    <div className="border-t pt-3">
                      <p className="text-xs font-medium text-gray-500 uppercase mb-2">Resource Links</p>
                      {resourceLinks.map((link: any, index: number) => {
                        const isObject = typeof link === 'object' && link !== null;
                        const name = isObject ? link.name : `Resource ${index + 1}`;
                        const url = isObject ? link.url : link;
                        
                        return (
                          <a
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-indigo-600 hover:text-indigo-500 p-2 hover:bg-indigo-50 rounded"
                          >
                            <LinkIcon className="h-4 w-4 mr-2" />
                            <span className="truncate">{name}</span>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </Card.Body>
              </Card>
            )}

            {/* Info */}
            <Card>
              <Card.Header>
                <h3 className="font-medium text-gray-900">Meeting Information</h3>
              </Card.Header>
              <Card.Body className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Created By</p>
                  <p className="font-medium text-gray-900">{creator?.name || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Created On</p>
                  <p className="font-medium text-gray-900">
                    {format(parseISO(meeting.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Meeting</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this meeting? This cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete} isLoading={isDeleting}>
                Delete Meeting
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingDetailPage;