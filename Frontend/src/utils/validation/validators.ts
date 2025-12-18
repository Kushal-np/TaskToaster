/**
 * Example of a custom validator.
 * Checks if a string contains only alphabetic characters.
 */
export const isAlpha = (value: string): boolean => {
  return /^[a-zA-Z]+$/.test(value);
};