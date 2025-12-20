interface RoleDisplayProps {
  role: string;
  assignedTo: string;
}

const RoleDisplay = ({ role, assignedTo }: RoleDisplayProps) => {
  return (
    <div className="text-center bg-white p-8 rounded-lg shadow">
      <p className="text-sm uppercase tracking-widest text-gray-500">Current Role</p>
      <h2 className="text-4xl font-bold text-indigo-600 mt-2">{role}</h2>
      <h3 className="text-2xl text-gray-800 mt-2">{assignedTo}</h3>
    </div>
  );
};

export default RoleDisplay;