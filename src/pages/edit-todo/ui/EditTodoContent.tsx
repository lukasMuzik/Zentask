import {useNavigate, useParams} from '@tanstack/react-router';
import {useGetTodoQuery} from '../api/useGetTodoQuery';
import {VStack} from '@chakra-ui/react';
import {EditTodoForm} from './EditTodoForm';
import {TodoFormHeader} from '../../../widgets/headers/TodoFormHeader';

export function EditTodoContent() {
  const {todoId} = useParams({from: '/_authenticated/edit/$todoId'});
  const {data, isLoading, error} = useGetTodoQuery(todoId);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({to: '/'});
  };

  if (isLoading) return <div>Načítání...</div>;
  if (error) return <div>Chyba při načítání todo</div>;
  if (!data) return <div>Todo nebylo nalezeno</div>;

  return (
    <VStack w="full" align="stretch" spacing="2.5rem">
      <TodoFormHeader title={data.title} handleBack={handleBack} />

      <EditTodoForm todoId={todoId} title={data.title} description={data.description} />
    </VStack>
  );
}
