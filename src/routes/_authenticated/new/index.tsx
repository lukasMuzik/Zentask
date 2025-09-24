import {createFileRoute} from '@tanstack/react-router';
import {NewTodoPage} from '@pages/new-todo/NewTodoPage';

export const Route = createFileRoute('/_authenticated/new/')({
  component: NewTodoPage,
});
