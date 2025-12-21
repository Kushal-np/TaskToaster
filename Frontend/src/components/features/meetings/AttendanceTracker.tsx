// src/components/features/meetings/AttendanceTracker.tsx
import { useState, useEffect } from 'react';
import { UserGroupIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Checkbox from '../../ui/Checkbox';

interface Attendee {
  id: string;
  name: string;
  email?: string;
  role?: string;
  isPresent: boolean;
  checkInTime?: string;
}

interface AttendanceTrackerProps {
  clubMembers?: Array<{ _id: string; name: string; email?: string; role?: string }>;
  onAttendanceChange?: (attendance: Attendee[]) => void;
}

const AttendanceTracker = ({ clubMembers = [], onAttendanceChange }: AttendanceTrackerProps) => {
  const [attendance, setAttendance] = useState<Attendee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize attendance from club members
  useEffect(() => {
    if (clubMembers.length > 0 && attendance.length === 0) {
      setAttendance(
        clubMembers.map(member => ({
          id: member._id,
          name: member.name,
          email: member.email,
          role: member.role,
          isPresent: false
        }))
      );
    }
  }, [clubMembers]);

  const handleToggle = (id: string) => {
    const updated = attendance.map(attendee =>
      attendee.id === id
        ? {
            ...attendee,
            isPresent: !attendee.isPresent,
            checkInTime: !attendee.isPresent ? new Date().toISOString() : undefined
          }
        : attendee
    );
    setAttendance(updated);
    if (onAttendanceChange) onAttendanceChange(updated);
  };

  const filteredAttendance = attendance.filter(attendee =>
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const presentCount = attendance.filter(a => a.isPresent).length;
  const totalCount = attendance.length;
  const attendanceRate = totalCount > 0 ? (presentCount / totalCount) * 100 : 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <UserGroupIcon className="h-5 w-5 text-indigo-600" />
          Attendance
        </h4>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">
            {presentCount}/{totalCount}
          </p>
          <p className="text-xs text-gray-500">{attendanceRate.toFixed(0)}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${attendanceRate}%` }}
          />
        </div>
      </div>

      {/* Search */}
      {totalCount > 5 && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      )}

      {/* Attendance List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredAttendance.length > 0 ? (
          filteredAttendance.map(attendee => (
            <div 
              key={attendee.id}
              className={`
                flex items-center gap-3 p-3 rounded-lg border transition-colors
                ${attendee.isPresent 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              <Checkbox
                id={`att-${attendee.id}`}
                checked={attendee.isPresent}
                onChange={() => handleToggle(attendee.id)}
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <label 
                    htmlFor={`att-${attendee.id}`}
                    className={`text-sm font-medium cursor-pointer ${
                      attendee.isPresent ? 'text-green-900' : 'text-gray-900'
                    }`}
                  >
                    {attendee.name}
                  </label>
                  {attendee.isPresent && (
                    <CheckCircleIcon className="h-4 w-4 text-green-600" />
                  )}
                </div>
                {attendee.email && (
                  <p className="text-xs text-gray-500 truncate">{attendee.email}</p>
                )}
                {attendee.checkInTime && (
                  <p className="text-xs text-gray-400">
                    Checked in at {new Date(attendee.checkInTime).toLocaleTimeString()}
                  </p>
                )}
              </div>

              {attendee.role && (
                <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full">
                  {attendee.role}
                </span>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            {searchTerm ? 'No members found' : 'No members to track'}
          </p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t flex gap-2">
        <button
          onClick={() => {
            const updated = attendance.map(a => ({ ...a, isPresent: true, checkInTime: new Date().toISOString() }));
            setAttendance(updated);
            if (onAttendanceChange) onAttendanceChange(updated);
          }}
          className="flex-1 px-3 py-2 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 font-medium"
        >
          Mark All Present
        </button>
        <button
          onClick={() => {
            const updated = attendance.map(a => ({ ...a, isPresent: false, checkInTime: undefined }));
            setAttendance(updated);
            if (onAttendanceChange) onAttendanceChange(updated);
          }}
          className="flex-1 px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 font-medium"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default AttendanceTracker;