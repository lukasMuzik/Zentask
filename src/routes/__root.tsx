import {createRootRoute, Link, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools';
import {Flex} from '@chakra-ui/react';

export const Route = createRootRoute({
  component: () => (
    <>
      <Flex gap="4px" alignItems="center">
        <Link to="/">Home</Link> <Link to="/about">About</Link>
      </Flex>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
