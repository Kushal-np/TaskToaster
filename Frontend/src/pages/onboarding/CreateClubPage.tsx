import { useNavigate } from 'react-router-dom';
import ClubForm from '../../components/features/clubs/ClubForm';
import type { ICreateClubRequest } from '../../types';

const CreateClubPage = () => {
  const navigate = useNavigate();

  const handleCreateClub = (data: ICreateClubRequest) => {
    console.log('Creating club:', data);
    // Call API to create club
    navigate('/onboarding/complete');
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Create Your Club</h1>
      <p className="text-gray-600 mb-8">Fill in the details below to set up your new Toastmasters club.</p>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <ClubForm onSubmit={handleCreateClub} />
      </div>
    </div>
  );
};

export default CreateClubPage;