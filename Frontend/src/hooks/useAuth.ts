// src/hooks/useAuth.ts
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCredentials, logout, setLoading, setError } from '../store/slices/authSlice';
import { loginUser, logoutUser, getMe } from '../services/authService';
import { useToast } from './useToast';
import type { IUser, LoginCredentials } from '../types';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const login = useCallback(async (credentials: LoginCredentials): Promise<IUser> => {
    dispatch(setLoading(true));
    
    try {
      const response = await loginUser(credentials);
      const user = response.user;
      
      dispatch(setCredentials({ user }));
      toast.success(response.message || 'Login successful!');
      
      return user;
    } catch (error: any) {
      const message = error.message || 'Login failed';
      dispatch(setError(message));
      toast.error(message);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, toast]);

  const logoutUserAction = useCallback(async () => {
    try {
      const response = await logoutUser();
      dispatch(logout());
      toast.success(response.message || 'Logged out successfully');
    } catch (error: any) {
      console.error('Logout error:', error);
      // Still logout locally even if API call fails
      dispatch(logout());
      toast.error('Logged out locally');
    }
  }, [dispatch, toast]);

  const checkAuth = useCallback(async (): Promise<IUser | null> => {
    if (!isAuthenticated) {
      try {
        const response = await getMe();
        const user = response.user;
        
        dispatch(setCredentials({ user }));
        return user;
      } catch (error) {
        console.error('Auth check failed:', error);
        dispatch(logout());
        return null;
      }
    }
    return user;
  }, [dispatch, isAuthenticated, user]);

  return {
    login,
    logout: logoutUserAction,
    checkAuth,
    isAuthenticated,
    user,
  };
};