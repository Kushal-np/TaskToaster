// src/pages/meetings/LiveMeetingPage.tsx
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import LiveTimer from '../../components/features/meetings/LiveTimer';
import LiveMeetingControl from '../../components/features/meetings/LiveMeetingControl';
import RoleDisplay from '../../components/features/meetings/RoleDisplay';
import NextUpDisplay from '../../components/features/meetings/NextUpDisplay';
import AttendanceTracker from '../../components/features/meetings/AttendanceTracker';
import { useMeeting, useUpdateMeetingStatus } from '../../hooks/useMeetings';
import { useAgendaItems, useUpdateAgendaItem } from '../../hooks/useAgenda';
import { startMeeting, setCurrentAgendaItem, stopTimer } from '../../store/slices/meetingSlice';
import { MeetingStatus } from '../../types/meeting.types';

type IClubWithMembers = {
  _id: string;
  clubName: string;
  clubNumber: string;
  members?: { _id: string; name: string; email: string }[];
};

const LiveMeetingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: meeting, isLoading: meetingLoading } = useMeeting(id);
  const { data: agendaItems, isLoading: agendaLoading } = useAgendaItems(id!);
  const updateMeetingStatus = useUpdateMeetingStatus();
  const updateAgendaItem = useUpdateAgendaItem(id!);

  // Initialize live meeting when component mounts
  useEffect(() => {
    if (id && agendaItems && agendaItems.length > 0) {
      dispatch(startMeeting(id));
      
      // Set first incomplete item as current
      const firstIncomplete = agendaItems.find(item => !item.isCompleted);
      if (firstIncomplete) {
        dispatch(setCurrentAgendaItem({
          ...firstIncomplete,
          assignedTo: typeof firstIncomplete.assignedTo === 'string'
            ? firstIncomplete.assignedTo
            : firstIncomplete.assignedTo?.name || 'Unassigned',
        }));
      }
    }
  }, [id, agendaItems, dispatch]);

  // Handle completing current agenda item
  const handleCompleteItem = async () => {
    if (!agendaItems) return;
    
    const currentItem = agendaItems.find(item => !item.isCompleted);
    if (currentItem) {
      try {
        await updateAgendaItem.mutateAsync({
          itemId: currentItem._id,
          updates: { isCompleted: true },
        });
      } catch (error) {
        console.error('Failed to complete agenda item:', error);
      }
    }
  };

  // Handle moving to next item
  const handleNext = () => {
    if (!agendaItems) return;
    
    const currentIndex = agendaItems.findIndex(item => !item.isCompleted);
    if (currentIndex >= 0 && currentIndex < agendaItems.length - 1) {
      const nextItem = agendaItems[currentIndex + 1];
      dispatch(setCurrentAgendaItem({
        ...nextItem,
        assignedTo: typeof nextItem.assignedTo === 'string'
          ? nextItem.assignedTo
          : nextItem.assignedTo?.name || 'Unassigned',
      }));
      dispatch(stopTimer());
    }
  };

  // Handle ending meeting
  const handleEndMeeting = async () => {
    try {
      await updateMeetingStatus.mutateAsync({
        meetingId: id!,
        status: MeetingStatus.COMPLETED,
      });
      navigate(`/meetings/${id}`);
    } catch (error) {
      console.error('Failed to end meeting:', error);
    }
  };

  if (meetingLoading || agendaLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading live meeting..." />
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="max-w-md mx-auto mt-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Meeting Not Found</h2>
        <p className="text-gray-600">
          The meeting you're looking for doesn't exist.
        </p>
        <Link to="/meetings">
          <Button>Back to Meetings</Button>
        </Link>
      </div>
    );
  }

  if (!agendaItems || agendaItems.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">No Agenda Items</h2>
        <p className="text-gray-600">
          This meeting has no agenda items. Please add items before starting the live meeting.
        </p>
        <Link to={`/meetings/${id}/agenda`}>
          <Button>Build Agenda</Button>
        </Link>
      </div>
    );
  }

  const currentItem = agendaItems.find(item => !item.isCompleted);
  const club = typeof meeting.clubId === 'object' ? (meeting.clubId as IClubWithMembers) : null;

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link 
            to={`/meetings/${id}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Meeting Details
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{meeting.theme}</h1>
              <p className="text-gray-600 mt-1">
                {club?.clubName || 'Unknown Club'} • {new Date(meeting.meetingDate).toLocaleDateString()}
              </p>
            </div>
            
            {/* Meeting Status Badge */}
            <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live Meeting
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Role Display */}
            <RoleDisplay
              role={currentItem?.role}
              assignedTo={
                typeof currentItem?.assignedTo === 'string'
                  ? currentItem?.assignedTo
                  : currentItem?.assignedTo?.name || 'Unassigned'
              }
              allocatedTime={currentItem?.allocatedTime}
            />

            {/* Timer */}
            <LiveTimer 
              targetTime={currentItem?.allocatedTime}
              onTimeExpired={() => {
                console.log('Time expired for current item');
              }}
            />

            {/* Meeting Controls */}
            <LiveMeetingControl
              agendaItems={agendaItems}
              onNext={handleNext}
              onComplete={handleCompleteItem}
              onEndMeeting={handleEndMeeting}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Next Up */}
            <NextUpDisplay agendaItems={agendaItems} />

            {/* Attendance Tracker */}
            <AttendanceTracker 
              clubMembers={club?.members || []}
              onAttendanceChange={(attendance) => console.log('Attendance updated:', attendance)}
            />
          </div>
        </div>

        {/* Meeting Progress Footer */}
        <div className="mt-8 bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {agendaItems.filter(i => i.isCompleted).length} of {agendaItems.length} items completed
            </span>
            <span>
              Meeting #{meeting.meetingNumber}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMeetingPage;
