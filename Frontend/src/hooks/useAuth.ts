import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setUser, logout } from '../store/slices/authSlice';
import { IUser } from '../types';

/**
 * Custom hook for authentication-related state and actions.
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, hasToken } = useAppSelector((state) => state.auth);

  const login = (userData: IUser) => {
    dispatch(setUser(userData));
  };

  const signout = () => {
    // Here you would also call the logout API endpoint
    dispatch(logout());
  };

  return { user, isAuthenticated, hasToken, login, signout };
};