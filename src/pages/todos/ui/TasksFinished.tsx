import {Center, Text, VStack} from '@chakra-ui/react';
import {Logo} from '@ui/Logo';
export function TasksFinished() {
  return (
    <Center>
        <VStack spacing="1rem">
          <Logo variant="double" />
          <VStack spacing="0.75rem">
            <Text fontSize="heading.3" fontWeight="heading.2" lineHeight="1.5rem">
              You are amazing!
            </Text>
            <Text color="text-tertiary">There is no more tasks to do.</Text>
          </VStack>
        </VStack>
      </Center>
  )
}