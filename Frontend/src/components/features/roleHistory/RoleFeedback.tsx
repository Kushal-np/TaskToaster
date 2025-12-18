import { StarIcon } from '@heroicons/react/20/solid';

interface RoleFeedbackProps {
  feedback?: string;
  rating?: number;
}

const RoleFeedback = ({ feedback, rating }: RoleFeedbackProps) => {
  return (
    <div className="mt-4 rounded-md border bg-gray-50 p-4">
      <h4 className="text-sm font-medium text-gray-800">Feedback</h4>
      {rating && (
        <div className="flex items-center mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
          ))}
        </div>
      )}
      <p className="mt-2 text-sm text-gray-600">{feedback || 'No feedback provided.'}</p>
    </div>
  );
};

export default RoleFeedback;