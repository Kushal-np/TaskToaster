import { useForm } from 'react-hook-form';
import { Button } from '../../ui/Button';
import Input from '../../ui/Input';
import type { IUser } from '../../../types';

type ProfileFormData = Pick<IUser, 'name' | 'email' | 'phone'>;

interface ProfileFormProps {
  onSubmit: (data: ProfileFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<ProfileFormData>;
}

const ProfileForm = ({ onSubmit, isLoading, defaultValues }: ProfileFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto">
      <div>
        <label>Full Name</label>
        <Input {...register('name', { required: 'Name is required' })} />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <label>Email Address</label>
        <Input type="email" {...register('email', { required: 'Email is required' })} />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <label>Phone Number</label>
        <Input {...register('phone')} />
      </div>
      {/* Add password change fields if needed */}
      <div className="flex justify-end pt-4">
        <Button type="submit" isLoading={isLoading}>
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;