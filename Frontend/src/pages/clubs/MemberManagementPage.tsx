// src/pages/clubs/MemberManagementPage.tsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import MemberList from '../../components/features/clubs/MemberList';
import InviteMember from '../../components/features/clubs/InviteMember';
import { Button } from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import { clubService } from '../../services/clubService';

const MemberManagementPage = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  
  const { data: club, isLoading } = useQuery({
    queryKey: ['club', clubId],
    queryFn: () => clubService.getClubById(clubId!),
    enabled: !!clubId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading members..." />
      </div>
    );
  }

  if (!club) {
    return (
      <EmptyState
        title="Club Not Found"
        message="The club you're looking for doesn't exist or you don't have access."
        action={
          <Link to="/clubs">
            <Button>Back to My Clubs</Button>
          </Link>
        }
      />
    );
  }

  // Mock members data - you would fetch actual member details here
  const mockMembers = club.members?.map((memberId, index) => ({
    _id: memberId,
    name: `Member ${index + 1}`,
    email: `member${index + 1}@example.com`,
    role: index === 0 ? 'President' : 'Member',
  })) || [];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Link 
          to={`/clubs/${clubId}`} 
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Club Dashboard
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Member Management</h1>
          <p className="text-gray-600 mt-1">
            Manage members of {club.clubName}
          </p>
        </div>
        <Button onClick={() => setInviteModalOpen(true)}>
          Invite Member
        </Button>
      </div>

      <Card>
        <Card.Header>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Members</h2>
              <p className="text-sm text-gray-500 mt-1">
                {mockMembers.length} total members
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Export CSV
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <MemberList members={mockMembers} />
        </Card.Body>
      </Card>

      {/* Member Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-800">Active Members</p>
          <p className="text-2xl font-bold text-blue-900 mt-1">{mockMembers.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm font-medium text-green-800">New This Month</p>
          <p className="text-2xl font-bold text-green-900 mt-1">2</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-sm font-medium text-purple-800">Attendance Rate</p>
          <p className="text-2xl font-bold text-purple-900 mt-1">85%</p>
        </div>
      </div>

      <InviteMember
        isOpen={isInviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
      />
    </div>
  );
};

export default MemberManagementPage;