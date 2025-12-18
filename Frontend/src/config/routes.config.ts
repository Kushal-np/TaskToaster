import {
  HomeIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  MegaphoneIcon,
  DocumentDuplicateIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

export interface RouteConfig {
  path: string;
  name: string;
  icon?: React.ElementType;
  isNavItem?: boolean; // Should it appear in the main sidebar?
  children?: Omit<RouteConfig, 'icon' | 'isNavItem'>[];
}

export const routesConfig: RouteConfig[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: HomeIcon,
    isNavItem: true,
  },
  {
    path: '/clubs',
    name: 'Clubs',
    icon: UserGroupIcon,
    isNavItem: true,
  },
  {
    path: '/meetings',
    name: 'Meetings',
    icon: CalendarDaysIcon,
    isNavItem: true,
  },
  {
    path: '/events',
    name: 'Events',
    icon: MegaphoneIcon,
    isNavItem: true,
  },
  {
    path: '/templates',
    name: 'Templates',
    icon: DocumentDuplicateIcon,
    isNavItem: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    icon: UserCircleIcon,
    isNavItem: true,
  },
  // Add other non-nav routes here if needed for other logic
];