/**
 * Capitalizes the first letter of a string.
 */
export const capitalize = (s: string): string => {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

/**
 * Truncates a string to a specified length and adds an ellipsis.
 */
export const truncate = (s: string, length: number): string => {
  if (!s || s.length <= length) return s;
  return `${s.substring(0, length)}...`;
};