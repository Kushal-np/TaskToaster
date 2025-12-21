import { useNavigate } from 'react-router-dom';
import { useCreateGuest } from '../../hooks/useGuests';
import GuestForm from '../../components/features/guests/GuestForm';

const AddGuestPage = () => {
  const navigate = useNavigate();
  const createGuestMutation = useCreateGuest();

  const handleAddGuest = async (data: any) => {
    try {
      await createGuestMutation.mutateAsync(data);
      navigate('/guests');
    } catch (error) {
      // Error handled by hook
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Add New Guest</h1>
        <p className="mt-2 text-sm text-gray-600">
          Add a guest to your club directory
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <GuestForm
          onSubmit={handleAddGuest}
          isLoading={createGuestMutation.isPending}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
        <h3 className="text-sm font-medium text-blue-900 mb-2">
          Guest Information
        </h3>
        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
          <li>Guest name is required</li>
          <li>Email and phone are optional but recommended</li>
          <li>Mark as Toastmaster if they are a TM member</li>
          <li>Add home club details if available</li>
        </ul>
      </div>
    </div>
  );
};

export default AddGuestPage;