import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { OrderDetail } from '../../components/OrderDetail';
import { fetchOrder } from '../../lib/api';
import { Order } from '../../types';

const OrderDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const fetchedOrder = await fetchOrder(id as string);
          setOrder(fetchedOrder);
        } catch (err) {
          setError('Failed to fetch order details.');
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!order) return <p>No order found.</p>;

  return <OrderDetail order={order} />;
};

export default OrderDetailPage;