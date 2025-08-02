import { useState, useEffect } from 'react';
import { getUserNotifications, markNotificationAsRead } from '../utils/api';

export function useNotification(userId: string) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserNotifications(userId)
      .then(setNotifications)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  const markAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  return { notifications, loading, error, markAsRead };
}