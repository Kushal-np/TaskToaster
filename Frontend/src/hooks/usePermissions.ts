import { useAppSelector } from '../store/hooks';
import { isAdmin, isOwner } from '../utils';

/**
 * Custom hook to check user permissions.
 */
export const usePermissions = () => {
  const { user } = useAppSelector((state) => state.auth);

  const canEditResource = (resourceOwnerId: string) => {
    // An admin can edit any resource, or the owner can edit their own.
    return isAdmin(user) || isOwner(user, resourceOwnerId);
  };

  const isUserAdmin = isAdmin(user);

  return { canEditResource, isUserAdmin };
};