import { Toaster } from 'react-hot-toast';

/**
 * This component is a wrapper around the react-hot-toast library.
 * It should be placed at the root of your application (e.g., in App.tsx).
 */
const Toast = () => {
  return <Toaster position="top-right" reverseOrder={false} />;
};

export default Toast;