import {Box} from '@chakra-ui/react';
import {LoginHeader} from './ui/LoginHeader';
import {LoginContent} from './ui/LoginContent';

export function LoginPage() {
  return (
    <Box minH="100vh" px={{base: '0.5rem', sm: '2.5rem'}} pb="5rem" maxW="80rem" mx="auto">
      <LoginHeader />

      <LoginContent />
    </Box>
  );
}
