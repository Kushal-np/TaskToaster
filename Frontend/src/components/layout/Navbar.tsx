// src/components/layout/Navbar.tsx
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              Toastmasters Manager
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/clubs"
                  className="text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Clubs
                </Link>
                <Link
                  to="/meetings"
                  className="text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Meetings
                </Link>
                <Link
                  to="/events"
                  className="text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Events
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Home
                </Link>
              </>
            )}
          </div>

          {/* User Info & Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-sm font-medium text-gray-900">
                    {user.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {user.email}
                  </span>
                </div>
                <div className="relative group">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-800 font-semibold cursor-pointer">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </Link>
                    <div className="border-t my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                                <Button
                  size="sm"
                >
                  Login
                </Button>
                </Link>

                <Link to="/register"><Button
                  size="sm"
                >
                  Register
                </Button></Link>
                
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;