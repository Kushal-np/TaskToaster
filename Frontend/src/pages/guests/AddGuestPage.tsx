import GuestForm from '../../components/features/guests/GuestForm';

const AddGuestPage = () => {
  const handleAddGuest = (data: any) => {
    console.log('Adding guest:', data);
    // Call API to add guest
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add New Guest</h1>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <GuestForm onSubmit={handleAddGuest} />
      </div>
    </div>
  );
};

export default AddGuestPage;