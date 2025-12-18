import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const JoinClubPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<{ clubNumber: string }>();

  const handleJoinClub = (data: { clubNumber: string }) => {
    console.log('Joining club:', data.clubNumber);
    // Call API to join club
    navigate('/onboarding/complete');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">Join a Club</h1>
        <p className="text-gray-600 text-center mb-8">Enter your club's number to request to join.</p>
        <form onSubmit={handleSubmit(handleJoinClub)} className="bg-white p-8 rounded-lg shadow-md space-y-4">
          <div>
            <label>Club Number</label>
            <Input {...register('clubNumber', { required: true })} placeholder="e.g., 1234567" />
          </div>
          <Button type="submit" className="w-full">Request to Join</Button>
        </form>
      </div>
    </div>
  );
};

export default JoinClubPage;