// src/components/features/meetings/LiveMeetingControl.tsx
import { useDispatch, useSelector } from 'react-redux';
import { 
  PlayIcon, 
  PauseIcon, 
  ForwardIcon, 
  StopIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';
import { Button } from '../../ui/Button';

import type { RootState } from '../../../store/index';
import type { IAgendaItem } from '../../../types/meeting.types';
import { pauseTimer, setCurrentAgendaItem, startTimer, stopTimer } from '../../../store/slices/meetingSlice';

interface LiveMeetingControlProps {
  agendaItems?: IAgendaItem[];
  onNext?: () => void;
  onComplete?: () => void;
  onEndMeeting?: () => void;
}

const LiveMeetingControl = ({ 
  agendaItems = [],
  onNext,
  onComplete,
  onEndMeeting 
}: LiveMeetingControlProps) => {
  const dispatch = useDispatch();
  const { timerStatus, currentAgendaItem } = useSelector(
    (state: RootState) => state.liveMeeting
  );

  const currentIndex = currentAgendaItem 
    ? agendaItems.findIndex(item => item._id === currentAgendaItem._id)
    : -1;

  const hasNext = currentIndex < agendaItems.length - 1;
  const isLastItem = currentIndex === agendaItems.length - 1;

  const handleStart = () => {
    dispatch(startTimer());
  };

  const handlePause = () => {
    dispatch(pauseTimer());
  };

  const handleNext = () => {
    if (hasNext) {
      const nextItem = agendaItems[currentIndex + 1];
      dispatch(setCurrentAgendaItem(nextItem));
      dispatch(stopTimer());
      if (onNext) onNext();
    }
  };

  const handleCompleteItem = () => {
    if (onComplete) onComplete();
    if (hasNext) {
      handleNext();
    }
  };

  const handleEndMeeting = () => {
    if (confirm('Are you sure you want to end this meeting?')) {
      dispatch(stopTimer());
      if (onEndMeeting) onEndMeeting();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
        Meeting Controls
      </h3>

      <div className="space-y-4">
        {/* Primary Controls */}
        <div className="flex justify-center items-center gap-4">
          {/* Start/Resume */}
          {(timerStatus === 'stopped' || timerStatus === 'paused') && (
            <Button
              onClick={handleStart}
              size="lg"
              className="w-32"
            >
              <PlayIcon className="h-5 w-5 mr-2" />
              {timerStatus === 'paused' ? 'Resume' : 'Start'}
            </Button>
          )}

          {/* Pause */}
          {timerStatus === 'running' && (
            <Button
              onClick={handlePause}
              size="lg"
              className="w-32"
            >
              <PauseIcon className="h-5 w-5 mr-2" />
              Pause
            </Button>
          )}

          {/* Complete Current */}
          {currentAgendaItem && (
            <Button
              onClick={handleCompleteItem}
              size="lg"
              className="w-32 bg-green-600 hover:bg-green-700"
            >
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Complete
            </Button>
          )}
        </div>

        {/* Secondary Controls */}
        <div className="flex justify-center items-center gap-4 pt-4 border-t">
          {/* Next Item */}
          {hasNext && (
            <Button
              onClick={handleNext}
              className="w-40"
            >
              <ForwardIcon className="h-5 w-5 mr-2" />
              Skip to Next
            </Button>
          )}

          {/* End Meeting */}
          <Button
            onClick={handleEndMeeting}
            className="w-40"
          >
            <StopIcon className="h-5 w-5 mr-2" />
            End Meeting
          </Button>
        </div>

        {/* Progress Info */}
        {agendaItems.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>
                Item {currentIndex + 1} of {agendaItems.length}
              </span>
              <span>
                {agendaItems.filter(item => item.isCompleted).length} completed
              </span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / agendaItems.length) * 100}%`
                }}
              />
            </div>
          </div>
        )}

        {/* Status Message */}
        {isLastItem && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 text-center">
              ⚠️ This is the last agenda item
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveMeetingControl;