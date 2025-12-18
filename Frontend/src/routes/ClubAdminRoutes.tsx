import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { isAdmin } from '../utils'; // Assuming a permission check utility

const ClubAdminRoutes = () => {
  const user = useAppSelector((state) => state.auth.user);

  // This is a simplified check. A real-world app would have more complex
  // logic, possibly checking against a specific club's roles.
  if (!isAdmin(user)) {
    // Redirect non-admins to the dashboard or a "not authorized" page.
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ClubAdminRoutes;