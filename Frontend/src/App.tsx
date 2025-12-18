import { Toaster } from 'react-hot-toast';
import { AppRoutes } from './routes';
import ErrorBoundary from './components/shared/ErrorBoundary';

const App  = () => {
  return (
    <>
      <ErrorBoundary>
        <Toaster position="top-right" reverseOrder={false} />
        <AppRoutes />
      </ErrorBoundary>
    </>
  );
};

export default App;
