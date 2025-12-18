import TableTopicsList from '../../components/features/profile/TableTopicsList';

const TableTopicsPage = () => {
  // Data would be fetched from a hook or RTK Query
  const mockTopics: any[] = [];

  return (
    <TableTopicsList topics={mockTopics} />
  );
};

export default TableTopicsPage;