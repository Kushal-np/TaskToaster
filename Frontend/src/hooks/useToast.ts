import { toast } from 'react-hot-toast';

/**
 * Custom hook to provide a consistent interface for showing toast notifications.
 */
export const useToast = () => {
  return {
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    info: (message: string) => toast(message),
  };
};