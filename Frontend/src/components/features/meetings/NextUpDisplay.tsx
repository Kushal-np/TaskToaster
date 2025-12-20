const NextUpDisplay = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="text-lg font-semibold mb-3">Next Up</h4>
      <ul className="mt-2 space-y-2 text-sm">
        <li className="flex justify-between">
          <span>Evaluator</span>
          <span className="text-gray-500">John Doe</span>
        </li>
        <li className="flex justify-between">
          <span>Grammarian Report</span>
          <span className="text-gray-500">Jane Smith</span>
        </li>
      </ul>
    </div>
  );
};

export default NextUpDisplay;