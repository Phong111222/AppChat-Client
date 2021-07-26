import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ChatLayout from '../components/app/ChatLayout';
// import { Provider } from 'react-redux';
import AuthBackground from '../components/Auth/Background';
import WrappedAuth from '../components/Auth/WrappedAuth';
import wrapper from '../store';

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  return (
    // <Provider store={store}>
    <ChakraProvider>
      <CSSReset />
      {pathname === '/register' || pathname === '/' ? (
        <AuthBackground>
          <Component {...pageProps} />
        </AuthBackground>
      ) : (
        <WrappedAuth>
          <ChatLayout>
            <Component {...pageProps} />
          </ChatLayout>
        </WrappedAuth>
      )}
    </ChakraProvider>
    // </Provider>
  );
}

export default wrapper.withRedux(MyApp);
