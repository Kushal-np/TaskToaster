import { format, parseISO } from 'date-fns';

/**
 * Formats an ISO date string into a more readable format.
 * e.g., 'MMMM d, yyyy' -> "December 25, 2023"
 */
export const formatReadableDate = (dateString: string): string => {
  return format(parseISO(dateString), 'MMMM d, yyyy');
};

/**
 * Checks if a given date is in the past.
 */
export const isPastDate = (date: Date | string): boolean => {
  return new Date(date) < new Date();
};