import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import AuthBackground from '../components/Auth/Background';
import { Provider } from 'react-redux';
import store from '../store';
import wrapper from '../store';
const theme = {
  styles: {
    global: {
      '*': {
        padding: 0,
        margin: 0,
        boxSizing: 'border-box',
        fontSize: 16,
      },
    },
  },
};

const customTheme = extendTheme(theme);

function MyApp({ Component, pageProps }) {
  const token =
    (typeof window !== 'undefined' && localStorage.getItem('token')) || null;
  return (
    <ChakraProvider theme={customTheme}>
      {token ? (
        <Component {...pageProps} />
      ) : (
        <AuthBackground>
          <Component {...pageProps} />
        </AuthBackground>
      )}
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);
