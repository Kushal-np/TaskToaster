const RoleDisplay = ({ role, assignedTo }: { role: string; assignedTo: string }) => {
  return (
    <div className="text-center">
      <p className="text-sm uppercase tracking-widest text-gray-500">Current Role</p>
      <h2 className="text-4xl font-bold text-indigo-600">{role}</h2>
      <h3 className="text-2xl text-gray-800">{assignedTo}</h3>
    </div>
  );
};

export default RoleDisplay;