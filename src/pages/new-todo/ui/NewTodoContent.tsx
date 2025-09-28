import {VStack} from '@chakra-ui/react';
import {TodoFormHeader} from '@widgets/headers/TodoFormHeader';
import {NewTodoForm} from './NewTodoForm';
import {useNavigation} from '@shared/hooks/useNavigation';
import {useTranslation} from 'react-i18next';

export function NewTodoContent() {
  const {goHome} = useNavigation();
  const {t} = useTranslation('todos');

  return (
    <VStack w="full" align="stretch" spacing="2.5rem">
      <TodoFormHeader handleBack={goHome} title={t('headers.newTask')} />

      <NewTodoForm />
    </VStack>
  );
}
