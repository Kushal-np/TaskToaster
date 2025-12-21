import { toast } from 'react-hot-toast';
import { Button } from '../../ui/Button';
// import { useRsvpEventMutation, useCancelRsvpMutation } from '../../../store/api/eventApi';

interface RSVPButtonProps {
  eventId: string;
  hasRsvpd: boolean;
}

const RSVPButton = ({ eventId, hasRsvpd }: RSVPButtonProps) => {
  const isLoading = false; 
  console.log(eventId)

  const handleRsvp = async () => {
    toast.success("RSVP status updated!");
  };

  return (
    <Button onClick={handleRsvp} isLoading={isLoading} disabled={hasRsvpd}>
      {hasRsvpd ? "You've RSVP'd" : 'RSVP Now'}
    </Button>
  );
};

export default RSVPButton;