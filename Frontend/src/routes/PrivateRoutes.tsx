// src/components/auth/PrivateRoutes.tsx
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/shared/LoadingSpinner';

interface PrivateRoutesProps {
  allowedRoles?: string[];
}

const PrivateRoutes = ({ allowedRoles = [] }: PrivateRoutesProps) => {
  const { isAuthenticated, user, checkAuth } = useAuth();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(!isAuthenticated);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!isAuthenticated) {
        setIsChecking(true);
        try {
          await checkAuth();
        } catch (error) {
          console.error('Auth verification failed:', error);
        } finally {
          setIsChecking(false);
        }
      }
    };

    verifyAuth();
  }, [isAuthenticated, checkAuth]);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;