import { toast } from 'react-hot-toast';
import { Button } from '../../ui/Button';
// import { useRsvpEventMutation, useCancelRsvpMutation } from '../../../store/api/eventApi';

interface RSVPButtonProps {
  eventId: string;
  hasRsvpd: boolean;
}

const RSVPButton = ({ eventId, hasRsvpd }: RSVPButtonProps) => {
  // const [rsvp, { isLoading: isRsvping }] = useRsvpEventMutation();
  // const [cancelRsvp, { isLoading: isCancelling }] = useCancelRsvpMutation();
  const isLoading = false; // Placeholder

  const handleRsvp = async () => {
    // Logic to call rsvp or cancelRsvp mutation
    toast.success("RSVP status updated!");
  };

  return (
    <Button onClick={handleRsvp} isLoading={isLoading} disabled={hasRsvpd}>
      {hasRsvpd ? "You've RSVP'd" : 'RSVP Now'}
    </Button>
  );
};

export default RSVPButton;