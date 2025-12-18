import { useForm } from 'react-hook-form';
import { Button } from '../../ui/Button';
import Textarea from '../../ui/Textarea';
import Input from '../../ui/Input';

interface EvaluationFormData {
  feedback: string;
  rating: number;
}

interface SpeechEvaluationProps {
  onSubmit: (data: EvaluationFormData) => void;
  isLoading?: boolean;
}

const SpeechEvaluation = ({ onSubmit, isLoading }: SpeechEvaluationProps) => {
  const { register, handleSubmit } = useForm<EvaluationFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Rating (1-5)</label>
        <Input type="number" min="1" max="5" {...register('rating', { required: true, valueAsNumber: true })} />
      </div>
      <div>
        <label>Feedback</label>
        <Textarea rows={5} {...register('feedback', { required: 'Feedback is required' })} />
      </div>
      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading}>
          Submit Evaluation
        </Button>
      </div>
    </form>
  );
};

export default SpeechEvaluation;