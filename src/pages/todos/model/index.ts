import {Todo} from '../../../entities/Todo/model';

export interface TodoListProps {
  title: string;
  todoItems: Todo[];
}

export interface TodoItemProps {
  todo: Todo;
}
