import { useForm } from 'react-hook-form';
import { Button } from '../../ui/Button';
import Input from '../../ui/Input';
import Checkbox from '../../ui/Checkbox';
import type { IGuest } from '../../../types';

type GuestFormData = Omit<IGuest, '_id' | 'invitedBy' | 'meetingIds' | 'rolesTaken' | 'createdAt' | 'updatedAt'>;

interface GuestFormProps {
  onSubmit: (data: GuestFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<GuestFormData>;
}

const GuestForm = ({ onSubmit, isLoading, defaultValues }: GuestFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<GuestFormData>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Full Name</label>
        <Input {...register('name', { required: 'Name is required' })} />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label>Email</label>
          <Input type="email" {...register('email')} />
        </div>
        <div>
          <label>Phone</label>
          <Input {...register('phone')} />
        </div>
      </div>
      <div className="flex items-center">
        <Checkbox id="isToastmaster" {...register('isToastmaster')} />
        <label htmlFor="isToastmaster" className="ml-2 text-sm font-medium text-gray-700">Is a Toastmaster?</label>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label>Home Club Name</label>
          <Input {...register('homeClubName')} />
        </div>
        <div>
          <label>Home Club Number</label>
          <Input {...register('homeClubNumber')} />
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <Button type="submit" isLoading={isLoading}>
          {defaultValues ? 'Save Guest' : 'Add Guest'}
        </Button>
      </div>
    </form>
  );
};

export default GuestForm;