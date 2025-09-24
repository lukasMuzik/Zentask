import {createFileRoute} from '@tanstack/react-router';
import {TodosPage} from '@pages/todos/TodosPage';

export const Route = createFileRoute('/_authenticated/')({
  component: TodosPage,
});
