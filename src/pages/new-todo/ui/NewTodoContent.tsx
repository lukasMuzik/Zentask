import {useNavigate} from '@tanstack/react-router';
import {VStack} from '@chakra-ui/react';
import {TodoFormHeader} from '../../../widgets/headers/TodoFormHeader';
import {NewTodoForm} from './NewTodoForm';

export function NewTodoContent() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({to: '..'});
  };

  return (
    <VStack w="full" align="stretch" spacing="2.5rem">
      <TodoFormHeader handleBack={handleBack} title="New Task" />

      <NewTodoForm />
    </VStack>
  );
}
