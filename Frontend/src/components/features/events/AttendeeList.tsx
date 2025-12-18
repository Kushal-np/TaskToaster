import type { IUser } from '../../../types';
import Avatar from '../../ui/Avatar';

interface AttendeeListProps {
  attendees: Partial<IUser>[]; // Should be populated user data
}

const AttendeeList = ({ attendees }: AttendeeListProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900">Attendees ({attendees.length})</h3>
      <div className="mt-4 flow-root">
        <ul className="-my-4 divide-y divide-gray-200">
          {attendees.map((person) => (
            <li key={person._id} className="flex items-center space-x-4 py-4">
              <Avatar initials={person.name?.charAt(0) || '?'} />
              <p className="text-sm font-medium text-gray-900">{person.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AttendeeList;