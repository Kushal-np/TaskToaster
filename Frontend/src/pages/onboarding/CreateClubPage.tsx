// src/pages/onboarding/CreateClubPage.tsx
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ClubForm from '../../components/features/clubs/ClubForm';
import { useClubMutations } from '../../hooks/useClubMutations';
import Card from '../../components/ui/Card';
import type { ICreateClubRequest } from '../../types';

const CreateClubPage = () => {
  const { createClub } = useClubMutations();

  const handleSubmit = (data: ICreateClubRequest) => {
    createClub.mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-6">
        <Link 
          to="/onboarding" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Onboarding
        </Link>
      </div>

      <Card>
        <Card.Header>
          <h1 className="text-2xl font-bold text-gray-900">Create Your Club</h1>
          <p className="text-gray-600 mt-1">
            Set up your Toastmasters club profile to get started
          </p>
        </Card.Header>
        <Card.Body>
          <ClubForm
            onSubmit={handleSubmit}
            isLoading={createClub.isPending}
            submitButtonText="Create Club"
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateClubPage;