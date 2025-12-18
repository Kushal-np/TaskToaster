import ClubSettings from '../../components/features/clubs/ClubSettings';

const ClubSettingsPage = () => {
  // Fetch club data to pass as defaultValues
  const mockClub: any = {};

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Club Settings</h1>
      <ClubSettings club={mockClub} />
    </div>
  );
};

export default ClubSettingsPage;