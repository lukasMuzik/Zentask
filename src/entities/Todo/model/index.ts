import type {Todo} from '../../../../backend/database/todos';

export type {Todo} from '../../../../backend/database/todos';

export interface TodosResponse {
  todos: Todo[];
}
