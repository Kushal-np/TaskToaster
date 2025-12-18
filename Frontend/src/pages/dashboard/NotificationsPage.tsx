import EmptyState from '../../components/ui/EmptyState';

const NotificationsPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>
      <EmptyState title="No new notifications" message="You're all caught up!" />
    </div>
  );
};

export default NotificationsPage;