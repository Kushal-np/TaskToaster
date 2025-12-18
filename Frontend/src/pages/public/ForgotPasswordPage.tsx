import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ForgotPasswordPage = () => {
  const { register, handleSubmit } = useForm<{ email: string }>();

  const onSubmit = (data: { email: string }) => {
    console.log('Password reset for:', data.email);
    // Call API to send password reset link
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-2 text-center text-2xl font-bold">Forgot Password</h2>
        <p className="mb-6 text-center text-sm text-gray-600">Enter your email to receive a reset link.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Email</label>
            <Input type="email" {...register('email', { required: true })} />
          </div>
          <Button type="submit" className="w-full">Send Reset Link</Button>
        </form>
        <p className="mt-4 text-center text-sm"><Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Back to Login</Link></p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;