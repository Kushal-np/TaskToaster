// src/components/features/templates/TemplateForm.tsx
import { useForm, useFieldArray, type UseFormRegister } from 'react-hook-form';
import { Button } from '../../ui/Button';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';
import Select from '../../ui/Select';
import Checkbox from '../../ui/Checkbox';
import { Bars3Icon, TrashIcon } from '@heroicons/react/24/outline';
import type { ICreateTemplateRequest, IClub } from '../../../types';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TemplateFormProps {
  onSubmit: (data: ICreateTemplateRequest) => void;
  isLoading?: boolean;
  defaultValues?: Partial<ICreateTemplateRequest>;
  clubs?: IClub[];
}

interface TemplateItemRowProps {
  id: string;
  index: number;
  remove: (index?: number | number[]) => void;
  register: UseFormRegister<ICreateTemplateRequest>;
}

const TemplateItemRow = ({ id, index, remove, register }: TemplateItemRowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="flex items-start space-x-2 rounded-md border bg-gray-50 p-4">
      <div {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600 pt-2">
        <Bars3Icon className="h-5 w-5" />
      </div>
      <div className="grow space-y-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Role <span className="text-red-500">*</span>
            </label>
            <Input 
              placeholder="e.g., TMoD, Evaluator" 
              {...register(`items.${index}.role`, { required: true })} 
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Time <span className="text-red-500">*</span>
            </label>
            <Input 
              type="time" 
              {...register(`items.${index}.time`, { required: true })} 
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Duration <span className="text-red-500">*</span>
            </label>
            <Input 
              placeholder="e.g., 5 mins" 
              {...register(`items.${index}.allocatedItem`, { required: true })} 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Description <span className="text-gray-400">(Optional)</span>
            </label>
            <Input 
              placeholder="Additional notes..."
              {...register(`items.${index}.description`)} 
            />
          </div>
          <div className="flex items-end pb-2">
            <Checkbox 
              id={`item-required-${index}`}
              {...register(`items.${index}.isRequired`)} 
            />
            <label htmlFor={`item-required-${index}`} className="ml-2 text-xs text-gray-700">
              Required role
            </label>
          </div>
        </div>
      </div>
      <button 
        type="button" 
        onClick={() => remove(index)} 
        className="text-red-500 hover:text-red-700 transition-colors pt-6"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

const TemplateForm = ({ onSubmit, isLoading, defaultValues, clubs = [] }: TemplateFormProps) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<ICreateTemplateRequest>({
    defaultValues: defaultValues || { 
      name: '', 
      description: '', 
      items: [],
      clubId: undefined,
    },
  });

  const { fields, append, remove, move } = useFieldArray({ control, name: 'items' });
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex(f => f.id === active.id);
      const newIndex = fields.findIndex(f => f.id === over.id);
      move(oldIndex, newIndex);
    }
  };

  const handleFormSubmit = (data: ICreateTemplateRequest) => {
    const payload: any = {
      name: data.name.trim(),
      description: data.description?.trim() || undefined,
      items: data.items.map((item, index) => ({
        time: item.time,
        role: item.role.trim(),
        allocatedItem: item.allocatedItem.trim(),
        sequence: index + 1,
        isRequired: item.isRequired || false,
        description: item.description?.trim() || undefined,
      })),
      clubId: data.clubId || undefined,
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Template Name <span className="text-red-500">*</span>
        </label>
        <Input 
          placeholder="e.g., Standard Meeting Format"
          {...register('name', { 
            required: 'Template name is required',
            minLength: { value: 3, message: 'Name must be at least 3 characters' }
          })} 
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-gray-400 text-xs">(Optional)</span>
        </label>
        <Textarea 
          placeholder="Describe when to use this template..."
          rows={3}
          {...register('description')} 
        />
      </div>

      {clubs && clubs.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Associate with Club <span className="text-gray-400 text-xs">(Optional)</span>
          </label>
          <Select {...register('clubId')}>
            <option value="">None (Personal Template)</option>
            {clubs.map((club) => (
              <option key={club._id} value={club._id}>
                {club.clubName}
              </option>
            ))}
          </Select>
          <p className="mt-1 text-xs text-gray-500">
            Leave empty for personal template, or select a club to share with members
          </p>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Agenda Items <span className="text-red-500">*</span>
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {fields.length === 0 ? 'Add at least one item' : `${fields.length} item${fields.length === 1 ? '' : 's'}`}
            </p>
          </div>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {fields.map((field, index) => (
                <TemplateItemRow
                  key={field.id}
                  id={field.id}
                  index={index}
                  remove={remove}
                  register={register}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <Button
          type="button"
          className="mt-4 w-full sm:w-auto"
          onClick={() => append({ 
            time: '00:00', 
            role: '', 
            allocatedItem: '', 
            sequence: 0,
            isRequired: false,
            description: '',
          })}
        >
          + Add Agenda Item
        </Button>

        {fields.length === 0 && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              <strong>Required:</strong> Add at least one agenda item
            </p>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Form Guide:</h4>
        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
          <li><strong>Role:</strong> Meeting role (TMoD, Timer, Speaker)</li>
          <li><strong>Time:</strong> Start time (e.g., 7:00 PM)</li>
          <li><strong>Duration:</strong> Time allocated (e.g., "5 mins")</li>
          <li><strong>Drag ☰ to reorder items</strong></li>
        </ul>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button 
          type="submit" 
          isLoading={isLoading}
          disabled={fields.length === 0}
        >
          {defaultValues?.name ? 'Save Changes' : 'Create Template'}
        </Button>
      </div>
    </form>
  );
};

export default TemplateForm;