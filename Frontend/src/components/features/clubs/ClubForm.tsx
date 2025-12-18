import { useForm } from 'react-hook-form';
import { Button } from '../../ui/Button';
import Input from '../../ui/Input';
import type { ICreateClubRequest } from '../../../types';

interface ClubFormProps {
  onSubmit: (data: ICreateClubRequest) => void;
  isLoading?: boolean;
  defaultValues?: Partial<ICreateClubRequest>;
}

const ClubForm = ({ onSubmit, isLoading, defaultValues }: ClubFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ICreateClubRequest>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label>Club Name</label>
          <Input {...register('clubName', { required: 'Club Name is required' })} />
          {errors.clubName && <p className="mt-1 text-sm text-red-600">{errors.clubName.message}</p>}
        </div>
        <div>
          <label>Club Number</label>
          <Input {...register('clubNumber', { required: 'Club Number is required' })} />
          {errors.clubNumber && <p className="mt-1 text-sm text-red-600">{errors.clubNumber.message}</p>}
        </div>
        <div>
          <label>Region</label>
          <Input {...register('region', { required: 'Region is required' })} />
          {errors.region && <p className="mt-1 text-sm text-red-600">{errors.region.message}</p>}
        </div>
        <div>
          <label>District</label>
          <Input {...register('district', { required: 'District is required' })} />
          {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district.message}</p>}
        </div>
        <div>
          <label>Division</label>
          <Input {...register('division', { required: 'Division is required' })} />
          {errors.division && <p className="mt-1 text-sm text-red-600">{errors.division.message}</p>}
        </div>
        <div>
          <label>Area</label>
          <Input {...register('area', { required: 'Area is required' })} />
          {errors.area && <p className="mt-1 text-sm text-red-600">{errors.area.message}</p>}
        </div>
      </div>
      <div>
        <label>Chartered Date</label>
        <Input type="date" {...register('charteredDate', { required: 'Chartered Date is required' })} />
        {errors.charteredDate && <p className="mt-1 text-sm text-red-600">{errors.charteredDate.message}</p>}
      </div>
      <div className="flex justify-end pt-4">
        <Button type="submit" isLoading={isLoading}>{defaultValues ? 'Save Changes' : 'Create Club'}</Button>
      </div>
    </form>
  );
};

export default ClubForm;