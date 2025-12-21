// src/components/features/meetings/LiveTimer.tsx
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClockIcon, PlayIcon, PauseIcon, StopIcon } from '@heroicons/react/24/outline';
import { Button } from '../../ui/Button';
import { 
  startTimer, 
  pauseTimer, 
  stopTimer, 
  updateElapsedTime 
} from '../../../store/slices/meetingSlice';
import type { RootState } from '../../../store/index';

interface LiveTimerProps {
  targetTime?: string; // e.g., "5 mins"
  onTimeExpired?: () => void;
}

const LiveTimer = ({ targetTime, onTimeExpired }: LiveTimerProps) => {
  const dispatch = useDispatch();
  const { timerStatus, elapsedTime } = useSelector((state: RootState) => state.liveMeeting);
const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [isOvertime, setIsOvertime] = useState(false);

  // Parse target time to seconds
  const targetSeconds = targetTime 
    ? parseInt(targetTime.match(/(\d+)/)?.[1] || '0') * 60 
    : 0;

  useEffect(() => {
    if (timerStatus === 'running') {
      intervalRef.current = setInterval(() => {
        dispatch(updateElapsedTime(elapsedTime + 1));
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerStatus, elapsedTime, dispatch]);

  // Check for overtime
  useEffect(() => {
    if (targetSeconds && elapsedTime >= targetSeconds) {
      setIsOvertime(true);
      if (elapsedTime === targetSeconds && onTimeExpired) {
        onTimeExpired();
      }
    } else {
      setIsOvertime(false);
    }
  }, [elapsedTime, targetSeconds, onTimeExpired]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => dispatch(startTimer());
  const handlePause = () => dispatch(pauseTimer());
  const handleStop = () => dispatch(stopTimer());

  const getTimerColor = () => {
    if (!targetSeconds) return 'text-white';
    if (isOvertime) return 'text-red-400';
    if (elapsedTime >= targetSeconds * 0.8) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getRemainingTime = () => {
    if (!targetSeconds) return null;
    const remaining = targetSeconds - elapsedTime;
    return remaining > 0 ? remaining : 0;
  };

  const remaining = getRemainingTime();

  return (
    <div className="bg-gray-900 rounded-lg p-8 shadow-2xl">
      {/* Timer Display */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <ClockIcon className="h-8 w-8 text-gray-400 mr-3" />
          <h3 className="text-2xl font-bold text-white">
            {timerStatus === 'running' ? 'Timer Running' : 
             timerStatus === 'paused' ? 'Timer Paused' : 'Timer Ready'}
          </h3>
        </div>

        <div className={`text-8xl font-mono font-bold ${getTimerColor()} mb-4`}>
          {formatTime(elapsedTime)}
        </div>

        {/* Target Time Info */}
        {targetTime && (
          <div className="space-y-2">
            <p className="text-gray-400 text-lg">
              Target: {targetTime}
            </p>
            {remaining !== null && (
              <p className={`text-lg font-semibold ${
                remaining === 0 ? 'text-red-400' : 'text-gray-300'
              }`}>
                {remaining > 0 
                  ? `${Math.floor(remaining / 60)}:${(remaining % 60).toString().padStart(2, '0')} remaining`
                  : isOvertime ? `+${formatTime(elapsedTime - targetSeconds)} overtime` : 'Time Up!'
                }
              </p>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4">
        {timerStatus === 'stopped' && (
          <Button
            onClick={handleStart}
            size="lg"
            className="bg-green-600 hover:bg-green-700"
          >
            <PlayIcon className="h-5 w-5 mr-2" />
            Start
          </Button>
        )}

        {timerStatus === 'running' && (
          <Button
            onClick={handlePause}
            size="lg"
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            <PauseIcon className="h-5 w-5 mr-2" />
            Pause
          </Button>
        )}

        {timerStatus === 'paused' && (
          <Button
            onClick={handleStart}
            size="lg"
            className="bg-green-600 hover:bg-green-700"
          >
            <PlayIcon className="h-5 w-5 mr-2" />
            Resume
          </Button>
        )}

        {(timerStatus === 'running' || timerStatus === 'paused') && (
          <Button
            onClick={handleStop}
            size="lg"
          >
            <StopIcon className="h-5 w-5 mr-2" />
            Stop
          </Button>
        )}
      </div>

      {/* Status Indicators */}
      <div className="mt-6 flex justify-center gap-4">
        <div className={`w-3 h-3 rounded-full ${
          timerStatus === 'running' ? 'bg-green-500 animate-pulse' : 'bg-gray-600'
        }`} />
        <div className={`w-3 h-3 rounded-full ${
          timerStatus === 'paused' ? 'bg-yellow-500' : 'bg-gray-600'
        }`} />
        <div className={`w-3 h-3 rounded-full ${
          isOvertime ? 'bg-red-500 animate-pulse' : 'bg-gray-600'
        }`} />
      </div>
    </div>
  );
};

export default LiveTimer;