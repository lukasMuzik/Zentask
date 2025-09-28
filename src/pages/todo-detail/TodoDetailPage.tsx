import {useParams} from '@tanstack/react-router';
import {useGetTodoQuery} from '@entities/Todo/api/useGetTodoQuery';
import {useToggleTodoMutation} from '@features/todos/toggle/api/useToggleTodoMutation';
import {useDeleteTodoMutation} from '@features/todos/delete/api/useDeleteTodoMutation';
import {Box, Text, VStack, HStack, Flex} from '@chakra-ui/react';
import {Helmet} from 'react-helmet-async';
import {Button} from '@ui/Button';
import {Checkbox} from '@ui/Checkbox';
import {BackwardsIcon} from '@shared/assets/icons';
import {DetailActions} from './ui/DetailActions';
import {DetailSection} from './ui/DetailSection';
import {match, P} from 'ts-pattern';
import {Spinner} from '@ui/Spinner';
import {Error} from '@ui/Error';
import {useNavigation} from '@shared/hooks/useNavigation';
import {useTranslation} from 'react-i18next';

export const TodoDetailPage = () => {
  const {todoId} = useParams({from: '/_authenticated/detail/$todoId'});
  const {data: todo, isLoading} = useGetTodoQuery(todoId);
  const {goHome, goToEditTodo} = useNavigation();
  const toggleTodoMutation = useToggleTodoMutation();
  const deleteTodoMutation = useDeleteTodoMutation({
    onSuccess: goHome,
  });
  const {t} = useTranslation(['common', 'todos']);

  const handleToggleComplete = () => {
    if (!todo) {
      return;
    }

    toggleTodoMutation.mutate({todoId: todo.id, completed: todo.completed});
  };

  const handleEdit = () => {
    goToEditTodo(todoId);
  };

  const handleDelete = () => {
    if (!todo) {
      return;
    }

    deleteTodoMutation.mutate(todo.id);
  };

  return match({isLoading, todo})
    .with({isLoading: true}, () => (
      <>
        <Helmet>
          <title>{t('common:pages.taskDetail')}</title>
        </Helmet>
        <Spinner />
      </>
    ))
    .with({todo: P.nullish}, () => (
      <>
        <Helmet>
          <title>{t('common:pages.taskDetail')}</title>
        </Helmet>
        <Error message={t('todos:errors.taskNotFound')} />
      </>
    ))
    .with({todo: P.not(P.nullish)}, ({todo}) => (
      <>
        <Helmet>
          <title>{`${todo.title} - ${t('common:pages.taskDetail')}`}</title>
        </Helmet>
        <Box>
          <Flex as="header" align="center" gap="1.5rem" mb="2rem">
            <Button onClick={goHome} iconOnly={<BackwardsIcon />} variant="secondary" />
            <Text fontSize="heading.2" fontWeight="heading.1">
              {todo.title}
            </Text>
          </Flex>

          <VStack spacing="6" align="stretch">
            <DetailSection title={t('todos:headers.description')}>
              <Text fontSize="md" color="text-secondary" lineHeight="1.6" whiteSpace="pre-wrap">
                {todo.description}
              </Text>
            </DetailSection>

            <DetailSection title={t('todos:headers.status')}>
              <HStack spacing="3">
                <Checkbox isChecked={todo.completed} onChange={handleToggleComplete} />
                <Text color="text-secondary">
                  {todo.completed ? t('todos:status.completed') : t('todos:status.incomplete')}
                </Text>
              </HStack>
            </DetailSection>

            <DetailActions onEdit={handleEdit} onDelete={handleDelete} />
          </VStack>
        </Box>
      </>
    ))
    .exhaustive();
};
