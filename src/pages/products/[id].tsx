import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ProductDetails } from '../../components';
import { fetchProductById } from '../../lib/api';
import { Product } from '../../types';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>{product.name}</title>
      </Head>
      <main className="py-8">
        <ProductDetails product={product} />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const product = await fetchProductById(params?.id as string);
  return {
    props: {
      product,
    },
  };
};

export default ProductDetail;
