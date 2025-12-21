// src/pages/clubs/CreateClubPage.tsx
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clubService } from '../../services/clubService';
import ClubForm from '../../components/features/clubs/ClubForm';
import { useToast } from '../../hooks/useToast';
import type { ICreateClubRequest } from '../../types';

const CreateClubPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  const createClubMutation = useMutation({
    mutationFn: (data: ICreateClubRequest) => clubService.createClub(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['clubs'] });
      toast.success('Club created successfully!');
      navigate(`/clubs/${data._id}`);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create club');
    },
  });

  const handleSubmit = (data: ICreateClubRequest) => {
    createClubMutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Create New Club</h1>
        <p className="mt-2 text-sm text-gray-600">
          Enter the details to register a new Toastmasters club
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <ClubForm
          onSubmit={handleSubmit}
          isLoading={createClubMutation.isPending}
          submitButtonText="Create Club"
        />
      </div>
    </div>
  );
};

export default CreateClubPage;