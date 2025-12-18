import { useState } from 'react';
import MemberList from '../../components/features/clubs/MemberList';
import InviteMember from '../../components/features/clubs/InviteMember';
import { Button } from '../../components/ui/Button';

const MemberManagementPage = () => {
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  // Fetch members data
  const mockMembers: any[] = [];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Member Management</h1>
        <Button onClick={() => setInviteModalOpen(true)}>Invite Member</Button>
      </div>
      <MemberList members={mockMembers} />
      <InviteMember isOpen={isInviteModalOpen} onClose={() => setInviteModalOpen(false)} />
    </div>
  );
};

export default MemberManagementPage;