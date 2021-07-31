import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ChatLayout from '../components/app/ChatLayout';
import { Provider } from 'react-redux';
import AuthBackground from '../components/Auth/Background';
import WrappedAuth from '../components/Auth/WrappedAuth';
import wrapper, { persistor, store } from '../store';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  return (
    <PersistGate persistor={persistor}>
      <ChakraProvider>
        <CSSReset />
        {pathname === '/register' || pathname === '/' ? (
          <AuthBackground>
            <Component {...pageProps} />
          </AuthBackground>
        ) : (
          <WrappedAuth>
            <ChatLayout pathName={pathname}>
              <Component {...pageProps} />
            </ChatLayout>
          </WrappedAuth>
        )}
      </ChakraProvider>
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
