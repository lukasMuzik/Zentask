import {Box, Center, Text} from '@chakra-ui/react';
import {LoginForm} from './LoginForm';

export function LoginContent() {
  return (
    <Center>
      <Box bg="fill-white" maxW="35rem" borderRadius="2rem" p="2.5rem">
        <Box mb="2.5rem">
          <Text as="h1" fontSize="heading.1" fontWeight="heading.1" mb="1.5rem" lineHeight="2rem">
            It's good to have you back!
          </Text>

          <Text color="text-secondary" lineHeight="1.5rem" fontSize="text.base">
            Welcome to our secure portal! To access the full functionality of our app, kindly
            provide your credentials below. Your privacy is our priority.
          </Text>
        </Box>

        <LoginForm />
      </Box>
    </Center>
  );
}
