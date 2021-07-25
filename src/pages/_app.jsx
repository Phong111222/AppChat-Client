import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import AuthBackground from '../components/Auth/Background';
import wrapper, { store } from '../store';

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  return (
    <Provider store={store}>
      <ChakraProvider>
        <CSSReset />
        {pathname === '/register' || pathname === '/' ? (
          <AuthBackground>
            <Component {...pageProps} />
          </AuthBackground>
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
