import {Center, Spinner as ChakraSpinner} from '@chakra-ui/react';

export function Spinner() {
  return (
    <Center>
      <ChakraSpinner size="xl" color="fill-brand" speed="0.7s" thickness="0.25rem" />
    </Center>
  );
}
