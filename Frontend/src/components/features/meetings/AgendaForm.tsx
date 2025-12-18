import { useForm } from 'react-hook-form';
import { Button } from '../../ui/Button';
import Input from '../../ui/Input';
import type { IAgendaItem } from '../../../types';

type FormData = Pick<IAgendaItem, 'time' | 'role' | 'assignedToName' | 'allocatedTime'>;

interface AgendaFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<FormData>;
}

const AgendaForm = ({ onSubmit, isLoading, defaultValues }: AgendaFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label>Time</label>
          <Input type="time" {...register('time', { required: true })} />
        </div>
        <div>
          <label>Allocated Time</label>
          <Input {...register('allocatedTime', { required: true })} placeholder="e.g., 5 mins" />
        </div>
      </div>
      <div>
        <label>Role</label>
        <Input {...register('role', { required: true })} />
      </div>
      <div>
        <label>Assigned To (Name)</label>
        <Input {...register('assignedToName')} placeholder="Leave blank if unassigned" />
      </div>
      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading}>
          {defaultValues ? 'Save Item' : 'Add Item'}
        </Button>
      </div>
    </form>
  );
};

export default AgendaForm;