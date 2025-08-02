import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CategoryDetail } from '../../components/CategoryDetail';
import { fetchCategory } from '../../lib/api';
import { Category } from '../../types';

const CategoryDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const fetchedCategory = await fetchCategory(id as string);
          setCategory(fetchedCategory);
        } catch (err) {
          setError('Failed to fetch category details.');
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!category) return <p>No category found.</p>;

  return <CategoryDetail category={category} />;
};

export default CategoryDetailPage;