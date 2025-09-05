import {Todo} from '../../../entities/Todo';

export interface TodosResponse {
  todos: Todo[];
}

export interface TodoListProps {
  title: string;
  todoItems: Todo[];
}

export interface TodoItemProps {
  todo: Todo;
}

export interface ToggleCompleteParams {
  todoId: string;
  completed: boolean;
}
