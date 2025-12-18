/**
 * Checks if an array is null, undefined, or empty.
 */
export const isNullOrEmpty = <T>(arr: T[] | null | undefined): boolean => {
  return !arr || arr.length === 0;
};