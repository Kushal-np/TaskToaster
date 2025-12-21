import { useForm } from 'react-hook-form';
import { Button } from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import type { ICreateMeetingRequest } from '../../../types/meeting.types';

interface MeetingFormProps {
  onSubmit: (data: ICreateMeetingRequest) => void;
  isLoading?: boolean;
  defaultValues?: Partial<ICreateMeetingRequest>;
  clubs: { _id: string; clubName: string }[]; // Simplified club type
}

const MeetingForm = ({ onSubmit, isLoading, defaultValues, clubs }: MeetingFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ICreateMeetingRequest>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="clubId" className="block text-sm font-medium text-gray-700">Club</label>
        <Select id="clubId" {...register('clubId', { required: 'Club is required' })}>
          <option value="">Select a club...</option>
          {clubs.map((club) => (
            <option key={club._id} value={club._id}>{club.clubName}</option>
          ))}
        </Select>
        {errors.clubId && <p className="mt-1 text-sm text-red-600">{errors.clubId.message}</p>}
      </div>

      <div>
        <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Theme</label>
        <Input id="theme" {...register('theme', { required: 'Theme is required' })} />
        {errors.theme && <p className="mt-1 text-sm text-red-600">{errors.theme.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="meetingDate" className="block text-sm font-medium text-gray-700">Date</label>
          <Input id="meetingDate" type="date" {...register('meetingDate', { required: 'Date is required' })} />
          {errors.meetingDate && <p className="mt-1 text-sm text-red-600">{errors.meetingDate.message}</p>}
        </div>
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
          <Input id="startTime" type="time" {...register('startTime', { required: 'Time is required' })} />
          {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime.message}</p>}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading}>
          {defaultValues ? 'Save Changes' : 'Create Meeting'}
        </Button>
      </div>
    </form>
  );
};

export default MeetingForm;