import {ChakraProvider} from '@chakra-ui/react';
import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import GlobalStyles from './GlobalStyles';
import WebVitals from './WebVitals';
import './i18n/i18n';
import theme from './theme';
import {routeTree} from './routeTree.gen';
import {createRouter, RouterProvider} from '@tanstack/react-router';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

const rootElement = document.getElementById('root');

if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <ChakraProvider theme={theme} resetCSS>
        <HelmetProvider>
          <RouterProvider router={router} />
          <GlobalStyles />
          <WebVitals showStatusInConsoleLog />
        </HelmetProvider>
      </ChakraProvider>
    </StrictMode>
  );
}
