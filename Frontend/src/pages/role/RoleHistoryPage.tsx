import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserRoleHistory } from '../../hooks/useRoleHistory';
import { useAppSelector } from '../../store/hooks';
import RoleHistoryList from '../../components/features/profile/RoleHistoryList';
import RoleStats from '../../components/features/roleHistory/RoleStats';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Card from '../../components/ui/Card';
import {
  PlusIcon,
  UserGroupIcon,
  TrophyIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

const RoleHistoryPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [filterRole, setFilterRole] = useState<string>('');
  
  const { data, isLoading, error } = useUserRoleHistory(
    user?._id || '',
    filterRole || undefined
  );

  const roleHistory = data?.data || [];
  const stats = data?.stats;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="lg" text="Loading role history..." />
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Failed to Load Role History"
        message="There was an error loading your role history."
      />
    );
  }

  // Get unique roles for filter
  const uniqueRoles = Array.from(
    new Set(roleHistory.map(r => r.role))
  ).sort();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Role History</h1>
          <p className="mt-1 text-sm text-gray-600">
            {stats?.totalRoles || 0} role{stats?.totalRoles === 1 ? '' : 's'} performed
          </p>
        </div>
        <Link to="/roles/record">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Record Role
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <Card.Body>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.totalRoles || 0}
                </p>
                <p className="text-sm text-gray-600">Total Roles</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrophyIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {Object.keys(stats?.roleBreakdown || {}).length}
                </p>
                <p className="text-sm text-gray-600">Different Roles</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <StarIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.averageRating
                    ? stats.averageRating.toFixed(1)
                    : 'N/A'}
                </p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Filter */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex items-center gap-4">
          <label htmlFor="role-filter" className="text-sm font-medium text-gray-700">
            Filter by Role:
          </label>
          <Select
            id="role-filter"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="w-64"
          >
            <option value="">All Roles</option>
            {uniqueRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Select>
          {filterRole && (
            <Button
              size="sm"
              onClick={() => setFilterRole('')}
            >
              Clear Filter
            </Button>
          )}
        </div>
      </div>

      {/* Role Breakdown */}
      {stats && stats.roleBreakdown && Object.keys(stats.roleBreakdown).length > 0 && (
        <RoleStats stats={stats} />
      )}

      {/* Role History List */}
      {roleHistory && roleHistory.length > 0 ? (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Role Timeline
            </h2>
            <RoleHistoryList history={roleHistory} />
          </div>
        </div>
      ) : (
        <EmptyState
          title="No Roles Recorded"
          message={
            filterRole
              ? `No ${filterRole} roles found. Try changing the filter.`
              : "You haven't recorded any meeting roles yet. Start by recording your first role!"
          }
        />
      )}
    </div>
  );
};

export default RoleHistoryPage;