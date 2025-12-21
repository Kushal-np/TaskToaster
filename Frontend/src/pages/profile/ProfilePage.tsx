// src/pages/profile/ProfilePage.tsx
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import ProfileHeader from '../../components/features/profile/ProfileHeader';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/index';
import { Button } from '../../components/ui/Button';

const tabs = [
  { name: 'Role History', href: '/profile/roles' },
  { name: 'Speeches', href: '/profile/speeches' },
  { name: 'Table Topics', href: '/profile/table-topics' },
  { name: 'Pathways', href: '/profile/pathways' },
];

const ProfilePage = () => {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Profile Not Found</h2>
        <p className="text-gray-600">
          You are not logged in or your profile could not be found.
        </p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ProfileHeader user={user} />

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.href}
              className={({ isActive }) =>
                `whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                  isActive
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`
              }
            >
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
