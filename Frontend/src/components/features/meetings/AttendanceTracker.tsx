import Checkbox from '../../ui/Checkbox';

const mockMembers = [
  { id: '1', name: 'Kushal' },
  { id: '2', name: 'John Doe' },
  { id: '3', name: 'Jane Smith' },
];

const AttendanceTracker = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="font-semibold mb-2">Attendance</h4>
      <div className="space-y-2">
        {mockMembers.map(member => (
          <div key={member.id} className="flex items-center">
            <Checkbox id={`att-${member.id}`} />
            <label htmlFor={`att-${member.id}`} className="ml-2 text-sm">{member.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceTracker;