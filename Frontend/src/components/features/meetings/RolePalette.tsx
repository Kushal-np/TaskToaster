const defaultRoles = [
  'SAA', 
  'Presiding Officer', 
  'TMoD', 
  'General Evaluator', 
  'Timer', 
  'Ah-Counter', 
  'Grammarian', 
  'Speaker', 
  'Evaluator', 
  'Table Topics Master'
];

const RolePalette = () => {
  return (
    <div className="rounded-lg border p-4 bg-white">
      <h4 className="font-semibold mb-2">Role Palette</h4>
      <div className="flex flex-wrap gap-2">
        {defaultRoles.map(role => (
          <div
            key={role}
            className="cursor-grab rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
          >
            {role}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RolePalette;