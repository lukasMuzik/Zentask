import {Box, Text} from '@chakra-ui/react';
import {AuthForm} from '../../../features/auth/ui/AuthForm';

export function RegisterContent() {
  return (
    <>
      <Box mb="2.5rem">
        <Text as="h1" fontSize="heading.1" fontWeight="heading.1" mb="1.5rem" lineHeight="2rem">
          Welcome to Zentask!
        </Text>

        <Text color="text-secondary" lineHeight="1.5rem" fontSize="text.base">
          Welcome to our secure portal! To access the full functionality of our app, you must
          register first. Your privacy is our priority.
        </Text>
      </Box>

      <AuthForm variant="register" />
    </>
  );
}
