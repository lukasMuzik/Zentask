import {createRootRouteWithContext} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools';
import App from '../App';
import {AuthState} from '../app/providers/AuthProvider/types';

interface MyRouterContext {
  auth: AuthState;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <App />
      <TanStackRouterDevtools />
    </>
  ),
});
