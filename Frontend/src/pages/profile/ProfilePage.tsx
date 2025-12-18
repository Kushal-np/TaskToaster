import { Outlet, NavLink, useLocation } from 'react-router-dom';
import ProfileHeader from '../../components/features/profile/ProfileHeader';
import type { IUser } from '../../types';

const tabs = [
  { name: 'Role History', href: '/profile/roles' },
  { name: 'Speeches', href: '/profile/speeches' },
  { name: 'Table Topics', href: '/profile/table-topics' },
  { name: 'Pathways', href: '/profile/pathways' },
];

const ProfilePage = () => {
  const location = useLocation();
  // Mock user data, would come from Redux store
  const user: IUser = { _id: '1', name: 'Kushal', email: 'kushal@example.com', clubIds: [], createdAt: '', role: 'user', phone: '', updatedAt: '' };

  return (
    <div className="space-y-8">
      <ProfileHeader user={user} />
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <NavLink key={tab.name} to={tab.href} className={({ isActive }) => `whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${isActive ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
              {tab.name}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;