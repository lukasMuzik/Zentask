export type Todo = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  completed: boolean;
  userId: string;
};

export interface TodosResponse {
  todos: Todo[];
}
