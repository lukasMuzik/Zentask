import {createFileRoute} from '@tanstack/react-router';
import {EditTodoPage} from '../../../pages/edit-todo/EditTodoPage';

export const Route = createFileRoute('/_authenticated/edit/$todoId')({
  component: EditTodoPage,
});
