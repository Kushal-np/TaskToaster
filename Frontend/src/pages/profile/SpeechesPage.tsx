import SpeechList from '../../components/features/profile/SpeechList';

const SpeechesPage = () => {
  // Data would be fetched from a hook or RTK Query
  const mockSpeeches: any[] = [];

  return (
    <SpeechList speeches={mockSpeeches} />
  );
};

export default SpeechesPage;