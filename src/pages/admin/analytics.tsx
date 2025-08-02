import React, { useEffect, useState } from 'react';
import { fetchAnalytics } from '../../lib/api';
import { AnalyticsData } from '../../types';
import { AnalyticsDashboard } from '../../components/AnalyticsDashboard';

const AdminAnalyticsPage: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const fetchedAnalyticsData = await fetchAnalytics();
        setAnalyticsData(fetchedAnalyticsData);
      } catch (err) {
        setError('Failed to fetch analytics data.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!analyticsData) return <p>No analytics data available.</p>;

  return <AnalyticsDashboard data={analyticsData} />;
};

export default AdminAnalyticsPage;