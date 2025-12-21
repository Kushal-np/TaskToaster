import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-5xl font-bold text-gray-800">Welcome to Task Toaster</h1>
      <p className="mt-4 text-lg text-gray-600">Your ultimate companion for Toastmasters meetings.</p>
      <div className="mt-8 flex space-x-4">
        <Link to="/login">
          <Button size="lg">Login</Button>
        </Link>
        <Link to="/register">
          <Button size="lg" >Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;