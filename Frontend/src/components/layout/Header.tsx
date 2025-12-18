import { MarsIcon } from 'lucide-react';
// import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
// import { selectCurrentUser, logout } from '../../store/slices/authSlice';
// import { useNavigate } from 'react-router-dom';

const Header = () => {
  // const user = useAppSelector(selectCurrentUser);
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigate('/login');
  // };

  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <button className="md:hidden">
        <MarsIcon className="h-6 w-6" />
      </button>

      {/* Placeholder for search bar */}
      <div className="flex-1"></div>

      {/* Placeholder for UserMenu, Notifications etc. */}
      <div className="flex items-center">
        <p className="text-sm font-medium text-gray-700">User Menu</p>
      </div>
    </header>
  );
};

export default Header;