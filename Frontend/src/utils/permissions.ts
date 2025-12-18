import type { IUser } from "../types";

/**
 * Checks if a user has an admin or superadmin role.
 * @param user The user object.
 * @returns True if the user is an admin or superadmin.
 */
export const isAdmin = (user: IUser | null): boolean => {
  return !!user && (user.role === 'admin' || user.role === 'superadmin');
};

/**
 * Checks if a user is the owner of a specific resource.
 * @param user The user object.
 * @param resourceOwnerId The ID of the user who created the resource.
 * @returns True if the user is the owner.
 */
export const isOwner = (user: IUser | null, resourceOwnerId: string): boolean => {
  return !!user && user._id === resourceOwnerId;
};