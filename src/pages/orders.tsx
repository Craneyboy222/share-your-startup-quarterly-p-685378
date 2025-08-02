import React from 'react';
import Head from 'next/head';
import { useAuth } from '../hooks/useAuth';
import { OrderList } from '../components';

const Orders: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Your Orders</title>
      </Head>
      <main className="py-8">
        <h1 className="text-3xl font-bold mb-4">Your Orders</h1>
        <OrderList userId={user.id} />
      </main>
    </div>
  );
};

export default Orders;
