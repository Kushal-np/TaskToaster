// src/pages/auth/RegisterPage.tsx
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { registerSchema } from '../../utils/validation';
import { Button } from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { registerUser } from '../../services/authService';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
  } = useForm<RegisterFormData>();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Auto-login after registration
      login({
        email: data.user.email,
        password: data.user.password, // Note: you might need to store password temporarily
      }).then(() => {
        toast.success('Registration successful!');
        navigate('/dashboard');
      }).catch(() => {
        // If auto-login fails, redirect to login page
        toast.success('Registration successful! Please login.');
        navigate('/login');
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Registration failed');
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Create your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Full Name</label>
            <Input 
              {...register('name')} 
            />
          </div>

          <div>
            <label>Email</label>
            <Input 
              type="email" 
              {...register('email')} 
            />
          </div>

          <div>
            <label>Phone Number</label>
            <Input 
              {...register('phone')} 
            />
          </div>

          <div>
            <label>Password</label>
            <Input 
              type="password" 
              {...register('password')} 
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Registering...' : 'Register'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;