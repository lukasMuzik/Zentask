import {Box, Text} from '@chakra-ui/react';
import {AuthForm} from '../../../features/auth/ui/AuthForm';

export function LoginContent() {
  return (
    <>
      <Box mb="2.5rem">
        <Text as="h1" fontSize="heading.1" fontWeight="heading.1" mb="1.5rem" lineHeight="2rem">
          It's good to have you back!
        </Text>

        <Text color="text-secondary" lineHeight="1.5rem" fontSize="text.base">
          Welcome to our secure portal! To access the full functionality of our app, kindly provide
          your credentials below. Your privacy is our priority.
        </Text>
      </Box>

      <AuthForm variant="login" />
    </>
  );
}
