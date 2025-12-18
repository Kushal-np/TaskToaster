import Select from '../../ui/Select';

const RoleAssignment = () => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Assign Role</label>
      <Select>
        <option>Select a member...</option>
        {/* Options would be populated with club members */}
      </Select>
    </div>
  );
};

export default RoleAssignment;