import {Center, VStack, Text, HStack} from '@chakra-ui/react';
import {Button} from '@ui/Button';
import {useNavigation} from '@shared/hooks/useNavigation';
import {useTranslation} from 'react-i18next';

interface ErrorHandlerProps {
  message?: string;
  onRetry?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function Error({message, action}: ErrorHandlerProps) {
  const {goHome} = useNavigation();
  const {t} = useTranslation('common');

  return (
    <Center>
      <VStack spacing="1rem">
        <Text color="red.500" textAlign="center">
          {message || t('errors.unexpected')}
        </Text>
        <HStack>
          <Button onClick={goHome} variant="secondary">
            {t('buttons.backToTaskList')}
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
