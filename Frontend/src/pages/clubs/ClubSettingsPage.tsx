// src/pages/clubs/ClubSettingsPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import ClubForm from '../../components/features/clubs/ClubForm';
import { Button } from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ICreateClubRequest } from '../../types';
import { clubService } from '../../services/clubService';
import { useEffect } from 'react';

const ClubSettingsPage = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  console.log('🔍 ClubSettingsPage - clubId:', clubId); // Debug log
  
  // Fetch club data with error handling
  const { 
    data: club, 
    isLoading: isLoadingClub,
    error: clubError,
    isError: isClubError 
  } = useQuery({
    queryKey: ['club', clubId],
    queryFn: () => clubService.getClubById(clubId!),
    enabled: !!clubId,
    retry: 1,
  });

  // Debug useEffect
  useEffect(() => {
    if (clubError) {
      console.error('❌ Error fetching club in settings:', clubError);
    }
    if (club) {
      console.log('✅ Club data loaded in settings:', club);
    }
  }, [club, clubError]);

  // Update club mutation
  const updateMutation = useMutation({
    mutationFn: ({ clubId, clubData }: { clubId: string; clubData: Partial<ICreateClubRequest> }) =>
      clubService.updateClub(clubId, clubData),
    onSuccess: (updatedClub) => {
      // Invalidate and refetch club data
      queryClient.invalidateQueries({ queryKey: ['club', clubId] });
      queryClient.setQueryData(['club', clubId], updatedClub);
      
      navigate(`/clubs/${clubId}`, {
        state: { 
          message: 'Club updated successfully!',
          type: 'success'
        },
      });
    },
    onError: (error) => {
      console.error('❌ Error updating club:', error);
    },
  });

  const handleSubmit = async (data: ICreateClubRequest) => {
    if (!clubId) return;
    try {
      await updateMutation.mutateAsync({ clubId, clubData: data });
    } catch (error) {
      // Error is handled by mutation
    }
  };

  if (isLoadingClub) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading club details..." />
      </div>
    );
  }

  if (isClubError || !club) {
    console.error('🚨 Club error or not found in settings:', clubError);
    return (
      <EmptyState
        title="Club Not Found"
        message={
          clubError?.message || 
          "The club you're looking for doesn't exist or you don't have access to it."
        }
        action={
          <Link to="/clubs">
            <Button>Back to My Clubs</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          to={`/clubs/${clubId}`} 
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Club Dashboard
        </Link>
      </div>

      <Card>
        <Card.Header>
          <h1 className="text-2xl font-bold text-gray-900">Club Settings</h1>
          <p className="text-gray-600 mt-1">
            Update your club's information and preferences
          </p>
        </Card.Header>
        <Card.Body>
          <ClubForm
            defaultValues={{
              clubName: club.clubName,
              clubNumber: club.clubNumber,
              region: club.region,
              district: club.district,
              division: club.division,
              area: club.area,
              charteredDate: club.charteredDate.split('T')[0],
            }}
            onSubmit={handleSubmit}
            isLoading={updateMutation.isPending}
            submitButtonText="Save Changes"
          />
        </Card.Body>
      </Card>

      {/* Danger Zone */}
      <Card className="mt-6 border-red-200">
        <Card.Header>
          <h2 className="text-xl font-bold text-red-700">Danger Zone</h2>
          <p className="text-red-600 text-sm mt-1">
            These actions are irreversible. Please be cautious.
          </p>
        </Card.Header>
        <Card.Body>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Delete Club</h3>
                <p className="text-sm text-gray-600">
                  Permanently delete this club and all its data
                </p>
              </div>
              <Button
                variant="danger"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this club? This action cannot be undone.')) {
                    console.log('Delete club:', clubId);
                  }
                }}
              >
                Delete Club
              </Button>
            </div>

            <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Leave Club</h3>
                <p className="text-sm text-gray-600">
                  Remove yourself from this club
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  if (window.confirm('Are you sure you want to leave this club?')) {
                    console.log('Leave club:', clubId);
                  }
                }}
              >
                Leave Club
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ClubSettingsPage;