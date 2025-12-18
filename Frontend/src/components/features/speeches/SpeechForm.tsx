import { useForm } from 'react-hook-form';
import { Button } from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import type { ISpeech } from '../../../types';

type SpeechFormData = Pick<ISpeech, 'title' | 'speechType' | 'duration' | 'completedAt'> & { meetingId: string; speakerId: string };

interface SpeechFormProps {
  onSubmit: (data: SpeechFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<SpeechFormData>;
}

const SpeechForm = ({ onSubmit, isLoading, defaultValues }: SpeechFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SpeechFormData>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Speech Title</label>
        <Input {...register('title', { required: 'Title is required' })} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label>Speech Type</label>
          <Select {...register('speechType')}>
            <option value="prepared">Prepared</option>
            <option value="evaluation">Evaluation</option>
            <option value="icebreaker">Ice Breaker</option>
          </Select>
        </div>
        <div>
          <label>Duration</label>
          <Input {...register('duration', { required: 'Duration is required' })} placeholder="e.g., 5-7 mins" />
        </div>
      </div>
      <div>
        <label>Meeting</label>
        <Select {...register('meetingId', { required: 'Meeting is required' })}>
          {/* Options would be populated with meetings */}
          <option value="">Select a meeting...</option>
        </Select>
      </div>
      <div>
        <label>Date Completed</label>
        <Input type="date" {...register('completedAt', { required: 'Date is required' })} />
      </div>
      <div className="flex justify-end pt-4">
        <Button type="submit" isLoading={isLoading}>{defaultValues ? 'Save Record' : 'Record Speech'}</Button>
      </div>
    </form>
  );
};

export default SpeechForm;