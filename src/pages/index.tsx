import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { StartupCard, SearchBar, FilterOptions } from '../components';
import { fetchStartups } from '../lib/api';
import { Startup } from '../types';

interface HomeProps {
  startups: Startup[];
}

const Home: React.FC<HomeProps> = ({ startups }) => {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Startup Platform</title>
        <meta name="description" content="Discover and discuss innovative startups" />
      </Head>
      <main className="py-8">
        <h1 className="text-3xl font-bold mb-4">Discover Startups</h1>
        <SearchBar onSearch={(query) => router.push(`/?search=${query}`)} />
        <FilterOptions />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {startups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const startups = await fetchStartups();
  return {
    props: {
      startups,
    },
  };
};

export default Home;
