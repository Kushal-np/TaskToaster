import { isAxiosError } from 'axios';

/**
 * Extracts a user-friendly error message from an API error.
 * It prioritizes messages from the API response body.
 */
export const getApiErrorMessage = (error: unknown): string => {
  if (isAxiosError(error) && error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred.';
};