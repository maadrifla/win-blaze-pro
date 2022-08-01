import type { AppProps } from 'next/app';

import { UserContextProvider } from '../contexts/useUserContext';

import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { UserKiwifyContextProvider } from '../contexts/useKiwify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <UserKiwifyContextProvider>
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </UserKiwifyContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
