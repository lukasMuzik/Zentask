import {Center, VStack, Text, HStack} from '@chakra-ui/react';
import {Button} from '@ui/Button';
import {useNavigation} from '@shared/hooks/useNavigation';

interface ErrorHandlerProps {
  message?: string;
  onRetry?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function Error({message = 'Unexpected error', action}: ErrorHandlerProps) {
  const {goHome} = useNavigation();

  return (
    <Center>
      <VStack spacing="1rem">
        <Text color="red.500" textAlign="center">
          {message}
        </Text>
        <HStack>
          <Button onClick={goHome} variant="secondary">
            Back to task list
          </Button>
          {action && (
            <Button onClick={() => action.onClick()} variant="secondary">
              {action.label}
            </Button>
          )}
        </HStack>
      </VStack>
    </Center>
  );
}
