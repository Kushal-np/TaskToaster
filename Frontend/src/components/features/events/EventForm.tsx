import { useForm } from 'react-hook-form';
import { Button } from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Textarea from '../../ui/Textarea';
import Checkbox from '../../ui/Checkbox';
import type { ICreateEventRequest } from '../../../types';

interface EventFormProps {
  onSubmit: (data: ICreateEventRequest) => void;
  isLoading?: boolean;
  defaultValues?: Partial<ICreateEventRequest>;
  clubs: { _id: string; clubName: string }[];
}

const EventForm = ({ onSubmit, isLoading, defaultValues, clubs }: EventFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ICreateEventRequest>({
    defaultValues: defaultValues || { isPublic: true, venueType: 'offline', eventType: 'other' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label>Event Name</label>
          <Input {...register('eventName', { required: 'Event name is required' })} />
          {errors.eventName && <p className="mt-1 text-sm text-red-600">{errors.eventName.message}</p>}
        </div>
        <div>
          <label>Club</label>
          <Select {...register('clubId', { required: 'Club is required' })}>
            <option value="">Select a club...</option>
            {clubs.map((club) => <option key={club._id} value={club._id}>{club.clubName}</option>)}
          </Select>
          {errors.clubId && <p className="mt-1 text-sm text-red-600">{errors.clubId.message}</p>}
        </div>
      </div>

      <div>
        <label>Description</label>
        <Textarea {...register('description', { required: 'Description is required' })} />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label>Event Date</label>
          <Input type="date" {...register('eventDate', { required: 'Date is required' })} />
        </div>
        <div>
          <label>Event Time</label>
          <Input type="time" {...register('eventTime', { required: 'Time is required' })} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label>Venue</label>
          <Input {...register('venue', { required: 'Venue is required' })} />
        </div>
        <div>
          <label>Venue Type</label>
          <Select {...register('venueType')}><option value="offline">Offline</option><option value="online">Online</option><option value="hybrid">Hybrid</option></Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label>Event Type</label>
          <Select {...register('eventType')}><option value="workshop">Workshop</option><option value="contest">Contest</option><option value="meeting">Meeting</option><option value="social">Social</option><option value="other">Other</option></Select>
        </div>
        <div>
          <label>Max Attendees (optional)</label>
          <Input type="number" {...register('maxAttendees')} />
        </div>
      </div>

      <div className="flex items-center"><Checkbox id="isPublic" {...register('isPublic')} /><label htmlFor="isPublic" className="ml-2">Public Event</label></div>

      <div className="flex justify-end pt-4"><Button type="submit" isLoading={isLoading}>{defaultValues ? 'Save Changes' : 'Create Event'}</Button></div>
    </form>
  );
};

export default EventForm;