import React from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { loginUser } from '../lib/api';

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await loginUser(data);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Head>
        <title>Login</title>
      </Head>
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" {...register('email', { required: true })} />
          {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" {...register('password', { required: true })} />
          {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Login</button>
      </form>
    </div>
  );
};

export default Login;
