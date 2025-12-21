// src/components/features/meetings/AgendaForm.tsx
import { useForm } from 'react-hook-form';
import { Button } from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import type { ICreateAgendaItemRequest } from '../../../types/meeting.types';

type FormData = Omit<ICreateAgendaItemRequest, 'meetingId' | 'sequence'>;

interface AgendaFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<FormData>;
}

const ROLE_OPTIONS = [
  'SAA',
  'Presiding Officer',
  'TMoD',
  'General Evaluator',
  'Grammarian',
  'Ah-Counter',
  'Timer',
  'Ballot Counter',
  'Table Topics Master',
  'Speaker',
  'Evaluator',
  'Other'
];

const AgendaForm = ({ onSubmit, isLoading, defaultValues }: AgendaFormProps) => {
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm<FormData>({ 
    defaultValues: {
      assignedToModel: 'User',
      ...defaultValues
    }
  });

  const assignedToModel = watch('assignedToModel');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Time */}
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
            Time *
          </label>
          <Input 
            id="time"
            type="time" 
            {...register('time', { required: 'Time is required' })} 
            error={errors.time?.message}
          />
        </div>

        {/* Allocated Time */}
        <div>
          <label htmlFor="allocatedTime" className="block text-sm font-medium text-gray-700 mb-1">
            Allocated Time *
          </label>
          <Input 
            id="allocatedTime"
            {...register('allocatedTime', { 
              required: 'Allocated time is required',
              pattern: {
                value: /^\d+\s*(min|mins|minutes?)$/i,
                message: 'Format: "5 mins" or "10 minutes"'
              }
            })} 
            placeholder="e.g., 5 mins"
            error={errors.allocatedTime?.message}
          />
          <p className="text-xs text-gray-500 mt-1">
            Format: "5 mins" or "10 minutes"
          </p>
        </div>
      </div>

      {/* Role */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
          Role *
        </label>
        <Select 
          id="role"
          {...register('role', { required: 'Role is required' })}
        >
          <option value="">Select a role...</option>
          {ROLE_OPTIONS.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </Select>
        {errors.role && (
          <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
        )}
      </div>

      {/* Assignment Type */}
      <div>
        <label htmlFor="assignedToModel" className="block text-sm font-medium text-gray-700 mb-1">
          Assign To Type
        </label>
        <Select 
          id="assignedToModel"
          {...register('assignedToModel')}
        >
          <option value="User">Club Member</option>
          <option value="Guest">Guest</option>
        </Select>
      </div>

      {/* Assigned To Name */}
      <div>
        <label htmlFor="assignedToName" className="block text-sm font-medium text-gray-700 mb-1">
          Assigned To (Name)
        </label>
        <Input 
          id="assignedToName"
          {...register('assignedToName')} 
          placeholder="Leave blank if unassigned"
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter the person's name or leave empty for later assignment
        </p>
      </div>

      {/* Assigned To ID (Optional) */}
      <div>
        <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-1">
          {assignedToModel === 'User' ? 'User ID' : 'Guest ID'} (Optional)
        </label>
        <Input 
          id="assignedTo"
          {...register('assignedTo')} 
          placeholder="MongoDB ObjectId (optional)"
        />
        <p className="text-xs text-gray-500 mt-1">
          Advanced: Direct ID reference (leave empty if unsure)
        </p>
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-4 border-t">
        <Button type="submit" isLoading={isLoading}>
          {defaultValues ? 'Save Changes' : 'Add Item'}
        </Button>
      </div>
    </form>
  );
};

export default AgendaForm;