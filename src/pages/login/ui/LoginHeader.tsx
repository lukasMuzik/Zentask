import {Flex, Text} from '@chakra-ui/react';
import {Logo} from '@ui/Logo';

export function LoginHeader() {
  return (
    <Flex justifyContent="center" alignItems="center" py="2.5rem" px={{base: '0.5rem', sm: '0rem'}}>
      <Flex alignItems="center" gap="0.75rem">
        <Logo variant="simple" width={37} height={32} />

        <Text fontSize="1.75rem" fontWeight="700" color="text-primary">
          Zentask
        </Text>
      </Flex>
    </Flex>
  );
}
