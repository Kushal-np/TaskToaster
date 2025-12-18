import { Outlet } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';

const DashboardLayout = () => {
  // This layout can be expanded with dashboard-specific contexts or elements.
  return (
    <div>
      <Breadcrumb />
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;