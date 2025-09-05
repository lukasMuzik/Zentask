import {AuthHeader} from '../../pages/auth/ui/AuthHeader';
import {Box, Center} from '@chakra-ui/react';
import {Outlet} from '@tanstack/react-router';

export function AuthLayout() {
  return (
    <Box minH="100vh" px={{base: '0.5rem', sm: '2.5rem'}} pb="5rem" maxW="80rem" mx="auto">
      <AuthHeader />

      <Center>
        <Box bg="fill-white" maxW="35rem" borderRadius="2rem" p="2.5rem">
          <Outlet />
        </Box>
      </Center>
    </Box>
  );
}
