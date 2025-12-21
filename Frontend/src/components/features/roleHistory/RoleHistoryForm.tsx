import { useForm } from 'react-hook-form';
import { Button } from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import type { IRoleHistory } from '../../../types';

type RoleHistoryFormData = Pick<IRoleHistory, 'participantName' | 'role' | 'completedAt'> & { meetingId: string };

interface RoleHistoryFormProps {
  onSubmit: (data: RoleHistoryFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<RoleHistoryFormData>;
}

const RoleHistoryForm = ({ onSubmit, isLoading, defaultValues }: RoleHistoryFormProps) => {
  const { register, handleSubmit, formState: { } } = useForm<RoleHistoryFormData>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Participant Name</label>
        <Input {...register('participantName', { required: 'Participant name is required' })} />
      </div>
      <div>
        <label>Role</label>
        <Input {...register('role', { required: 'Role is required' })} />
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
        <Button type="submit" isLoading={isLoading}>{defaultValues ? 'Save Record' : 'Record Role'}</Button>
      </div>
    </form>
  );
};

export default RoleHistoryForm;