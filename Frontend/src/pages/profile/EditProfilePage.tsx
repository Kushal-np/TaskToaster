import ProfileForm from '../../components/features/profile/ProfileForm';
import type { IUser } from '../../types';

const EditProfilePage = () => {
  // Mock user data, would come from Redux store
  const user: IUser = { _id: '1', name: 'Kushal', email: 'kushal@example.com', clubIds: [], createdAt: '', role: 'user', phone: '1234567890', updatedAt: '' };

  const handleUpdateProfile = (data: any) => {
    console.log('Updating profile:', data);
    // Call API to update profile
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <ProfileForm defaultValues={user} onSubmit={handleUpdateProfile} />
      </div>
    </div>
  );
};

export default EditProfilePage;