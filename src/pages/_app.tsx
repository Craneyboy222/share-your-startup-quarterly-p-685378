import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useStore } from '../store';
import '../styles/globals.css';
import { useEffect } from 'react';
import { initAnalytics } from '../utils/helpers';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
