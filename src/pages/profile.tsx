import React from 'react';
import Head from 'next/head';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { updateUserProfile } from '../lib/api';

const Profile: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  React.useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const onSubmit = async (data: any) => {
    try {
      await updateUserProfile(data);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Profile</title>
      </Head>
      <main className="py-8">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" id="username" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" {...register('username')} />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" {...register('email')} />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Update Profile</button>
        </form>
      </main>
    </div>
  );
};

export default Profile;
