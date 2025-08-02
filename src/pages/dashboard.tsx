import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { StartupList, NotificationList } from '../components';

const Dashboard: React.FC = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className="py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.username}</h1>
        <div className="flex space-x-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Your Startups</h2>
            <StartupList userId={user.id} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Notifications</h2>
            <NotificationList userId={user.id} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
