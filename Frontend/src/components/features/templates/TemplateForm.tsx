import { useForm, useFieldArray,type UseFormRegister } from 'react-hook-form';
import { Button } from '../../ui/Button';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';
import { Bars3Icon, TrashIcon } from '@heroicons/react/24/outline';
import type { ICreateTemplateRequest } from '../../../types';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TemplateFormProps {
  onSubmit: (data: ICreateTemplateRequest) => void;
  isLoading?: boolean;
  defaultValues?: Partial<ICreateTemplateRequest>;
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
    <div ref={setNodeRef} style={style} {...attributes} className="flex items-center space-x-4 rounded-md border bg-gray-50 p-4">
      <div {...listeners} className="cursor-grab text-gray-400">
        <Bars3Icon className="h-5 w-5" />
      </div>
      <div className="grid flex-grow grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-3">
        <Input placeholder="Role" {...register(`items.${index}.role`, { required: true })} />
        <Input type="time" {...register(`items.${index}.time`, { required: true })} />
        <Input placeholder="Allocated Time (e.g., 5 mins)" {...register(`items.${index}.allocatedTime`, { required: true })} />
      </div>
      <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700">
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

const TemplateForm = ({ onSubmit, isLoading, defaultValues }: TemplateFormProps) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<ICreateTemplateRequest>({
    defaultValues: defaultValues || { name: '', description: '', items: [] },
  });

  const { fields, append, remove, move } = useFieldArray({ control, name: 'items' });

  const sensors = useSensors(
    useSensor(PointerSensor),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex(f => f.id === active.id);
      const newIndex = fields.findIndex(f => f.id === over.id);
      move(oldIndex, newIndex);
    }
  };

  const handleFormSubmit = (data: ICreateTemplateRequest) => {
    const payload = { ...data, items: data.items.map((item, index) => ({ ...item, sequence: index + 1 })) };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label>Template Name</label>
        <Input {...register('name', { required: 'Template name is required' })} />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label>Description</label>
        <Textarea {...register('description')} />
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Template Items</h3>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
            <div className="mt-4 space-y-4">
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
          variant="secondary"
          className="mt-4"
          onClick={() => append({ time: '00:00', role: '', allocatedTime: '1 min', sequence: 0, isRequired: false })}
        >
          + Add Item
        </Button>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" isLoading={isLoading}>
          {defaultValues ? 'Save Changes' : 'Create Template'}
        </Button>
      </div>
    </form>
  );
};

export default TemplateForm;
