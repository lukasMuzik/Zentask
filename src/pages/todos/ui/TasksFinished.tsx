import {Center, Text, VStack} from '@chakra-ui/react';
import {Logo} from '@ui/Logo';
import {useTranslation} from 'react-i18next';

export function TasksFinished() {
  const {t} = useTranslation('todos');

  return (
    <Center>
      <VStack spacing="1rem">
        <Logo variant="double" />
        <VStack spacing="0.75rem">
          <Text fontSize="heading.3" fontWeight="heading.2" lineHeight="1.5rem">
            {t('messages.amazing')}
          </Text>
          <Text color="text-tertiary">{t('messages.noTasks')}</Text>
        </VStack>
      </VStack>
    </Center>
  );
}
