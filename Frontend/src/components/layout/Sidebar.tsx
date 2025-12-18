import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  GroupIcon,
  CalendarDaysIcon,
  MegaphoneIcon,
  LocateIcon,
  UserCircleIcon,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Clubs', href: '/clubs', icon: GroupIcon },
  { name: 'Meetings', href: '/meetings', icon: CalendarDaysIcon },
  { name: 'Events', href: '/events', icon: MegaphoneIcon },
  { name: 'Templates', href: '/templates', icon: LocateIcon },
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
];

const NavItem = ({ item }: { item: typeof navigation[0] }) => (
  <NavLink
    to={item.href}
    className={({ isActive }) =>
      `group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
        isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`
    }
  >
    <item.icon className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-300" />
    {item.name}
  </NavLink>
);

const Sidebar = () => {
  return (
    <div className="hidden w-64 flex-col bg-gray-800 md:flex">
      <div className="flex h-16 flex-shrink-0 items-center px-4 text-2xl font-semibold text-white">Task Toaster</div>
      <nav className="flex flex-1 flex-col overflow-y-auto px-2 py-4">
        {navigation.map((item) => <NavItem key={item.name} item={item} />)}
      </nav>
    </div>
  );
};

export default Sidebar;