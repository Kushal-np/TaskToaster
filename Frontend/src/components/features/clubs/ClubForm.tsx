import { useForm } from 'react-hook-form';
import { Button } from '../../ui/Button';
import Input from '../../ui/Input';
import type { ICreateClubRequest } from '../../../types';

interface ClubFormProps {
  onSubmit: (data: ICreateClubRequest) => void;
  isLoading?: boolean;
  defaultValues?: Partial<ICreateClubRequest>;
  submitButtonText?: string;
}

const ClubForm = ({ 
  onSubmit, 
  isLoading, 
  defaultValues,
  submitButtonText = 'Create Club'
}: ClubFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ICreateClubRequest>({
    defaultValues: defaultValues || {
      clubName: '',
      clubNumber: '',
      region: '',
      district: '',
      division: '',
      area: '',
      charteredDate: '',
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="clubName" className="block text-sm font-medium text-gray-700 mb-1">
            Club Name *
          </label>
          <Input
            id="clubName"
            {...register('clubName', { required: 'Club name is required' })}
            placeholder="Enter club name"
            error={errors.clubName?.message}
          />
        </div>

        <div>
          <label htmlFor="clubNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Club Number *
          </label>
          <Input
            id="clubNumber"
            {...register('clubNumber', { required: 'Club number is required' })}
            placeholder="e.g., 12345"
            error={errors.clubNumber?.message}
          />
        </div>

        <div>
          <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
            Region *
          </label>
          <Input
            id="region"
            {...register('region', { required: 'Region is required' })}
            placeholder="Enter region"
            error={errors.region?.message}
          />
        </div>

        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
            District *
          </label>
          <Input
            id="district"
            {...register('district', { required: 'District is required' })}
            placeholder="Enter district"
            error={errors.district?.message}
          />
        </div>

        <div>
          <label htmlFor="division" className="block text-sm font-medium text-gray-700 mb-1">
            Division *
          </label>
          <Input
            id="division"
            {...register('division', { required: 'Division is required' })}
            placeholder="Enter division"
            error={errors.division?.message}
          />
        </div>

        <div>
          <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
            Area *
          </label>
          <Input
            id="area"
            {...register('area', { required: 'Area is required' })}
            placeholder="Enter area"
            error={errors.area?.message}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="charteredDate" className="block text-sm font-medium text-gray-700 mb-1">
            Chartered Date *
          </label>
          <Input
            id="charteredDate"
            type="date"
            {...register('charteredDate', { required: 'Chartered date is required' })}
            error={errors.charteredDate?.message}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : submitButtonText}
        </Button>
      </div>
    </form>
  );
};

export default ClubForm;