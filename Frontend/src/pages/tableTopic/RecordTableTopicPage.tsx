import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCreateTableTopic } from '../../hooks/useTableTopics';
import { useAppSelector } from '../../store/hooks';
import TableTopicForm from '../../components/features/tableTopics/TableTopicForm';

const RecordTableTopicPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const meetingId = searchParams.get('meetingId');
  const { user } = useAppSelector((state) => state.auth);
  
  const createTableTopicMutation = useCreateTableTopic();

  const handleRecordTopic = async (data: any) => {
    try {
      await createTableTopicMutation.mutateAsync({
        ...data,
        participantId: user?._id,
        participantName: user?.name || data.participantName,
        participantModel: 'User',
      });
      navigate('/profile');
    } catch (error) {
      // Error handled by hook
    }
  };

  const defaultValues = meetingId ? { meetingId } : undefined;

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Record Table Topic</h1>
        <p className="mt-2 text-sm text-gray-600">
          Record your table topics session performance
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
        <TableTopicForm
          onSubmit={handleRecordTopic}
          isLoading={createTableTopicMutation.isPending}
          defaultValues={defaultValues}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-3xl mx-auto">
        <h3 className="text-sm font-medium text-blue-900 mb-2">
          Table Topics Tips
        </h3>
        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
          <li>Record the exact topic question you received</li>
          <li>Note your speaking time (target is usually 1-2 minutes)</li>
          <li>Table Topics help improve impromptu speaking skills</li>
          <li>Track your progress over time</li>
        </ul>
      </div>
    </div>
  );
};

export default RecordTableTopicPage;