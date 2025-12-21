import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import {

  UsersIcon,
  CalendarIcon,
  MegaphoneIcon,
  FileTextIcon,
  UserCircleIcon,
  UserPlusIcon,
  Mic,
  AwardIcon,
  MessageSquareIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  LayoutDashboardIcon,
} from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  children?: NavigationItem[];
}

const navigation: NavigationItem[] = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: LayoutDashboardIcon 
  },
  { 
    name: 'Clubs', 
    href: '/clubs', 
    icon: UsersIcon 
  },
  { 
    name: 'Meetings', 
    href: '/meetings', 
    icon: CalendarIcon 
  },
  { 
    name: 'Events', 
    href: '/events', 
    icon: MegaphoneIcon 
  },
  { 
    name: 'Guests', 
    href: '/guests', 
    icon: UserPlusIcon,
    children: [
      { name: 'Directory', href: '/guests', icon: UsersIcon },
      { name: 'Add Guest', href: '/guests/add', icon: UserPlusIcon },
    ]
  },
  {
    name: 'Performance',
    href: '/performance',
    icon: AwardIcon,
    children: [
      { name: 'Speeches', href: '/speeches', icon: Mic },
      { name: 'Roles', href: '/roles', icon: AwardIcon },
      { name: 'Table Topics', href: '/table-topics', icon: MessageSquareIcon },
    ]
  },
  { 
    name: 'Templates', 
    href: '/templates', 
    icon: FileTextIcon 
  },
  { 
    name: 'Profile', 
    href: '/profile', 
    icon: UserCircleIcon 
  },
];

interface NavItemProps {
  item: NavigationItem;
  isChild?: boolean;
}

const NavItem = ({ item, isChild = false }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group flex w-full items-center justify-between rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white ${
            isChild ? 'pl-9' : ''
          }`}
        >
          <div className="flex items-center">
            <item.icon className="mr-3 h-5 w-5 shrink text-gray-400 group-hover:text-gray-300" />
            {item.name}
          </div>
          {isOpen ? (
            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
          )}
        </button>
        
        {isOpen && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => (
              <NavItem key={child.name} item={child} isChild />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        `group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
          isChild ? 'pl-9' : ''
        } ${
          isActive 
            ? 'bg-gray-900 text-white' 
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`
      }
    >
      <item.icon className={`${isChild ? 'h-4 w-4' : 'h-5 w-5'} mr-3 shrink text-gray-400 group-hover:text-gray-300`} />
      {item.name}
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <div className="hidden w-64 flex-col bg-gray-800 md:flex">
      {/* Logo/Brand */}
      <div className="flex h-16 shrink items-center px-4">
        <h1 className="text-2xl font-bold text-white">
          Toastmasters
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col overflow-y-auto px-2 py-4 space-y-1">
        {navigation.map((item) => (
          <NavItem key={item.name} item={item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="flex shrink border-t border-gray-700 p-4">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-xs text-gray-400">
              © 2024 Toastmasters Manager
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;