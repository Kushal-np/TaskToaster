import ClubList from '../../components/features/clubs/ClubList';

const ClubDirectoryPage = () => {
  // Data would be fetched from a hook or RTK Query
  const mockClubs: any[] = [];

  return (
    <ClubList clubs={mockClubs} />
  );
};

export default ClubDirectoryPage;