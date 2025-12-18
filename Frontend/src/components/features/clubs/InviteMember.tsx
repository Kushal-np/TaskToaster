import { useForm } from 'react-hook-form';
import Modal from '../../ui/Modal';
import Input from '../../ui/Input';
import { Button } from '../../ui/Button';

interface InviteMemberProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteMember = ({ isOpen, onClose }: InviteMemberProps) => {
  const { register, handleSubmit } = useForm<{ email: string }>();

  const handleInvite = (data: { email: string }) => {
    console.log('Inviting member:', data.email);
    // Here you would call an API mutation to invite the member
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite New Member">
      <form onSubmit={handleSubmit(handleInvite)} className="space-y-4">
        <p className="text-sm text-gray-600">Enter the email address of the person you want to invite to the club.</p>
        <Input type="email" placeholder="member@example.com" {...register('email', { required: true })} />
        <div className="flex justify-end pt-2">
          <Button type="submit">Send Invitation</Button>
        </div>
      </form>
    </Modal>
  );
};

export default InviteMember;