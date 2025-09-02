import {createFileRoute} from '@tanstack/react-router';
import {Box, Center, Flex, Text, VStack} from '@chakra-ui/react';
import {Logo} from '@ui/Logo';
import {TextInput} from '@ui/TextInput';
import {Button} from '@ui/Button';

export const Route = createFileRoute('/login')({
  component: Login,
});

function Login() {
  return (
    <Box minH="100vh" px={{base: '0.5rem', sm: '2.5rem'}} pb="5rem" maxW="80rem" mx="auto">
      {/*TODO  Header */}
      <Flex
        justifyContent="center"
        alignItems="center"
        py="2.5rem"
        px={{base: '0.5rem', sm: '0rem'}}
      >
        {/* TODO Logo section */}
        <Flex alignItems="center" gap="0.75rem">
          <Logo variant="simple" width={37} height={32} />

          <Text fontSize="1.75rem" fontWeight="700" color="text-primary">
            Zentask
          </Text>
        </Flex>
      </Flex>

      {/* TODO Main Content Card */}
      <Center>
        <Box as="form" bg="fill-white" maxW="35rem" borderRadius="2rem" p="2.5rem">
          <Box mb="2.5rem">
            <Text as="h1" fontSize="heading.1" fontWeight="heading.1" mb="1.5rem">
              It's good to have you back!
            </Text>

            <Text color="text-secondary">
              Welcome to our secure portal! To access the full functionality of our app, kindly
              provide your credentials below. Your privacy is our priority.
            </Text>
          </Box>

          <VStack spacing="1.5rem" mb="2.5rem">
            <TextInput placeholder="Username" />
            <TextInput placeholder="Password" type="password" />
          </VStack>

          <Button type="submit" w="full">
            Login
          </Button>
        </Box>
      </Center>
    </Box>
  );
}
