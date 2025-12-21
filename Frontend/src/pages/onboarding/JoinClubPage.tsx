// src/pages/clubs/JoinClubPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clubService } from '../../services/clubService';
import { Button } from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../hooks/useToast';

const JoinClubPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [clubNumber, setClubNumber] = useState('');

  const joinClubMutation = useMutation({
    mutationFn: (clubNumber: string) => clubService.joinClub(clubNumber),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['clubs'] });
      toast.success('Successfully joined the club!');
      navigate(`/clubs/${data._id}`);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to join club');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubNumber.trim()) {
      toast.error('Please enter a club number');
      return;
    }
    joinClubMutation.mutate(clubNumber);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Join a Club</h1>
        <p className="mt-2 text-sm text-gray-600">
          Enter the club number to join an existing Toastmasters club
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="clubNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Club Number
            </label>
            <Input
              id="clubNumber"
              type="text"
              value={clubNumber}
              onChange={(e) => setClubNumber(e.target.value)}
              placeholder="Enter club number (e.g., 12345)"
              disabled={joinClubMutation.isPending}
            />
            <p className="mt-2 text-sm text-gray-500">
              The club number is a unique identifier for each Toastmasters club.
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              onClick={() => navigate('/clubs')}
              disabled={joinClubMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={joinClubMutation.isPending}
            >
              Join Club
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">
          Don't know the club number?
        </h3>
        <p className="text-sm text-blue-700">
          Contact your club's VPE or President to get the club number. 
          You can also find it on the Toastmasters International website.
        </p>
      </div>
    </div>
  );
};

export default JoinClubPage;