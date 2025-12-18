import Card from '../../ui/Card';
import Badge from '../../ui/Badge';
import type { ISpeech } from '../../../types';

interface SpeechCardProps {
  speech: ISpeech;
}

const SpeechCard = ({ speech }: SpeechCardProps) => {
  return (
    <Card>
      <Card.Header>
        <p className="font-semibold text-indigo-600">{speech.title}</p>
        <Badge color="blue">{speech.speechType}</Badge>
      </Card.Header>
      <Card.Body>
        <p className="text-sm text-gray-500">Delivered in "{speech.meetingId.theme}"</p>
        <p className="text-xs text-gray-400 mt-2">{new Date(speech.completedAt).toLocaleDateString()}</p>
      </Card.Body>
    </Card>
  );
};

export default SpeechCard;