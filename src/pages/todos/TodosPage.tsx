import {Box, Flex, VStack, Text} from '@chakra-ui/react';
import {Button} from '@ui/Button';
import {useNavigate} from '@tanstack/react-router';
import {TodosContent} from './ui/TodosContent';
import {useAuth} from '../../app/providers/AuthProvider/AuthProvider';

export function TodosPage() {
  const navigate = useNavigate();
  const {user} = useAuth();

  return (
    <VStack w="full" align="stretch" spacing="2.5rem">
      <Flex as="header" align="center" justify="space-between">
        <Box>
          <Text as="h1" fontSize="heading.2" fontWeight="heading.2" mb="0.5rem">
            Hello {user?.username}
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

      <TodosContent />
    </VStack>
  );
}
