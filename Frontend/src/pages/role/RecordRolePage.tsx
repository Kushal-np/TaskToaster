import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCreateRoleHistory } from '../../hooks/useRoleHistory';
import { useAppSelector } from '../../store/hooks';
import RoleHistoryForm from '../../components/features/roleHistory/RoleHistoryForm';

const RecordRolePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const meetingId = searchParams.get('meetingId');
  const { user } = useAppSelector((state) => state.auth);
  
  const createRoleHistoryMutation = useCreateRoleHistory();

  const handleRecordRole = async (data: any) => {
    try {
      await createRoleHistoryMutation.mutateAsync({
        ...data,
        userId: user?._id,
        participantName: user?.name || data.participantName,
        userModel: 'User',
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
        <h1 className="text-3xl font-bold text-gray-900">Record Role</h1>
        <p className="mt-2 text-sm text-gray-600">
          Record a meeting role you performed
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
        <RoleHistoryForm
          onSubmit={handleRecordRole}
          isLoading={createRoleHistoryMutation.isPending}
          defaultValues={defaultValues}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-3xl mx-auto">
        <h3 className="text-sm font-medium text-blue-900 mb-2">
          Common Meeting Roles
        </h3>
        <div className="grid grid-cols-2 gap-2 text-sm text-blue-700">
          <ul className="space-y-1 list-disc list-inside">
            <li>Toastmaster of the Day (TMoD)</li>
            <li>General Evaluator</li>
            <li>Timer</li>
            <li>Ah-Counter</li>
          </ul>
          <ul className="space-y-1 list-disc list-inside">
            <li>Grammarian</li>
            <li>Table Topics Master</li>
            <li>Evaluator</li>
            <li>Speaker</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecordRolePage;