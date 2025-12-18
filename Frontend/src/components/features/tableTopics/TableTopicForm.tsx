import { useForm } from 'react-hook-form';
import { Button } from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import type { ITableTopic } from '../../../types';

type TableTopicFormData = Pick<ITableTopic, 'participantName' | 'topic' | 'duration' | 'completedAt'> & { meetingId: string };

interface TableTopicFormProps {
  onSubmit: (data: TableTopicFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<TableTopicFormData>;
}

const TableTopicForm = ({ onSubmit, isLoading, defaultValues }: TableTopicFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<TableTopicFormData>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Participant Name</label>
        <Input {...register('participantName', { required: 'Participant name is required' })} />
      </div>
      <div>
        <label>Topic</label>
        <Input {...register('topic', { required: 'Topic is required' })} />
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
        <Button type="submit" isLoading={isLoading}>{defaultValues ? 'Save Record' : 'Record Topic'}</Button>
      </div>
    </form>
  );
};

export default TableTopicForm;