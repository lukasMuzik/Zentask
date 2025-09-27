import {VStack} from '@chakra-ui/react';
import {TodoFormHeader} from '@widgets/headers/TodoFormHeader';
import {NewTodoForm} from './NewTodoForm';
import {useNavigation} from '@shared/hooks/useNavigation';

export function NewTodoContent() {
  const {goHome} = useNavigation();

  return (
    <VStack w="full" align="stretch" spacing="2.5rem">
      <TodoFormHeader handleBack={goHome} title="New Task" />

      <NewTodoForm />
    </VStack>
  );
}
