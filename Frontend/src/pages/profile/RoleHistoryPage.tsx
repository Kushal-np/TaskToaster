import RoleHistoryList from '../../components/features/profile/RoleHistoryList';

const RoleHistoryPage = () => {
  // Data would be fetched from a hook or RTK Query
  const mockHistory: any[] = [];

  return (
    <RoleHistoryList history={mockHistory} />
  );
};

export default RoleHistoryPage;