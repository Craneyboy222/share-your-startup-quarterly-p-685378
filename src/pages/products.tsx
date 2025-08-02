import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ProductCard } from '../components';
import { fetchProducts } from '../lib/api';
import { Product } from '../types';

interface ProductsProps {
  products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Products</title>
      </Head>
      <main className="py-8">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await fetchProducts();
  return {
    props: {
      products,
    },
  };
};

export default Products;
