import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCreateSpeech } from '../../hooks/useSpeeches';
import { useAppSelector } from '../../store/hooks';
import SpeechForm from '../../components/features/speeches/SpeechForm';

const RecordSpeechPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const meetingId = searchParams.get('meetingId');
  const { user } = useAppSelector((state) => state.auth);
  
  const createSpeechMutation = useCreateSpeech();

  const handleRecordSpeech = async (data: any) => {
    try {
      await createSpeechMutation.mutateAsync({
        ...data,
        speakerId: user?._id || '',
        speakerName: user?.name || '',
        speakerModel: 'User',
      });
      navigate(`/meetings/${data.meetingId}`);
    } catch (error) {
      // Error handled by hook
    }
  };

  const defaultValues = meetingId ? { meetingId } : undefined;

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Record Speech</h1>
        <p className="mt-2 text-sm text-gray-600">
          Record your speech performance details
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
        <SpeechForm
          onSubmit={handleRecordSpeech}
          isLoading={createSpeechMutation.isPending}
          defaultValues={defaultValues}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-3xl mx-auto">
        <h3 className="text-sm font-medium text-blue-900 mb-2">
          Speech Recording Tips
        </h3>
        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
          <li>Record speech details immediately after delivery for accuracy</li>
          <li>Note your target duration vs actual duration</li>
          <li>Include Pathways project details if applicable</li>
          <li>Evaluation feedback can be added later</li>
        </ul>
      </div>
    </div>
  );
};

export default RecordSpeechPage;