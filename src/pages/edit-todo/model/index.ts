import {TodoFormInputs} from '@widgets/forms/TodoForm';

export interface EditTodoFormProps extends TodoFormInputs {
  todoId: string;
}
