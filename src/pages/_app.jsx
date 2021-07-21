import { ChakraProvider, extendTheme } from '@chakra-ui/react';

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
        <>
          <Component {...pageProps} />
        </>
      )}
    </ChakraProvider>
  );
}

export default MyApp;
