import {createFileRoute} from '@tanstack/react-router';
import {TodoDetailPage} from '@pages/todo-detail/TodoDetailPage';

export const Route = createFileRoute('/_authenticated/detail/$todoId')({
  component: TodoDetailPage,
});
