// src/pages/onboarding/JoinClubPage.tsx
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useClubMutations } from '../../hooks/useClubMutations';
import { Button } from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const JoinClubPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<{ clubNumber: string }>();
  const { joinClub } = useClubMutations();

  const onSubmit = (data: { clubNumber: string }) => {
    joinClub.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
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
          <h1 className="text-2xl font-bold text-gray-900">Join a Club</h1>
          <p className="text-gray-600 mt-1">
            Enter the club number provided by your club president or VP Membership
          </p>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="clubNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Club Number *
              </label>
              <Input
                id="clubNumber"
                {...register('clubNumber', { 
                  required: 'Club number is required',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Club number must contain only digits'
                  }
                })}
                placeholder="e.g., 12345"
                error={errors.clubNumber?.message}
              />
              <p className="mt-2 text-sm text-gray-500">
                Your club number is a unique identifier for your Toastmasters club. 
                If you don't know it, ask your club president or VP Membership.
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Link to="/onboarding">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" isLoading={joinClub.isPending}>
                Join Club
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Don't have a club number?</h3>
        <p className="text-sm text-blue-800 mb-3">
          If you're starting a new club, you can create one instead.
        </p>
        <Link to="/onboarding/create-club">
          <Button variant="outline" size="sm">
            Create New Club
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default JoinClubPage;