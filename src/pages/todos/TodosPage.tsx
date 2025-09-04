import {Box, Flex, VStack, Text, Center} from '@chakra-ui/react';
import {Button} from '@ui/Button';
import {Logo} from '@ui/Logo';
import {useNavigate} from '@tanstack/react-router';

export function TodosPage() {
  const navigate = useNavigate();

  return (
    <VStack w="full" align="stretch" spacing="2.5rem">
      <Flex as="header" align="center" justify="space-between">
        <Box>
          <Text as="h1" fontSize="heading.2" fontWeight="heading.2" mb="0.5rem">
            Hello Felix
          </Text>

          <Text color="text-secondary" fontSize="text.small">
            {new Date().toLocaleDateString('cs-CZ', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </Box>

        <Box pb="1.5rem" pl="1rem">
          <Button onClick={() => navigate({to: '/new'})}>New task</Button>
        </Box>
      </Flex>

      <Center>
        <VStack spacing="1rem">
          <Logo variant="double" />

          <VStack spacing="0.75rem">
            <Text fontSize="heading.3" fontWeight="heading.2" lineHeight="1.5rem">
              You are amazing!
            </Text>

            <Text color="text-tertiary">There is no more task to do.</Text>
          </VStack>
        </VStack>
      </Center>
    </VStack>
  );
}
