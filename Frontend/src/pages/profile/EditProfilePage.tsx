// src/pages/profile/EditProfilePage.tsx
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../../store/index';
import ProfileForm from '../../components/features/profile/ProfileForm';
import { Button } from '../../components/ui/Button';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { setCredentials } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/axiosConfig';
import type { IUser } from '../../types/auth.types';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user)
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const handleUpdateProfile = async (data: Partial<IUser>) => {
    if (!user) return;

    try {
      const res = await apiClient.put(`/users/${user._id}`, data); // Replace with your API endpoint
      const updatedUser: IUser = res.data.data;

      // Update Redux store
      dispatch(setCredentials({ user: updatedUser }));

      navigate('/profile'); // Navigate back to profile page
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading profile..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Profile Not Found</h2>
        <p className="text-gray-600">You are not logged in or your profile could not be found.</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <ProfileForm defaultValues={user} onSubmit={handleUpdateProfile} />
      </div>
    </div>
  );
};

export default EditProfilePage;
