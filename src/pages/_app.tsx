import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { FirebaseAppProvider } from 'reactfire';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

import FirebaseComponents from '@/app/FirebaseComponents';
import firebaseConfig from '@/app/firebaseConfig';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout): ReactNode => {
  const getLayout = Component.getLayout ?? ((page): ReactElement => page);

  return (
    <ChakraProvider>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <FirebaseComponents>
          {getLayout(<Component {...pageProps} />)}
        </FirebaseComponents>
      </FirebaseAppProvider>
    </ChakraProvider>
  );
};

export default App;
