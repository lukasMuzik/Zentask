import {VStack} from '@chakra-ui/react';
import {useNavigate} from '@tanstack/react-router';
import {TodoFormHeader} from '../../widgets/TodoFormHeader';
import {NewTodoForm} from './ui/NewTodoForm';

export function NewTodoPage() {
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
