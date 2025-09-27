import {useNavigate} from '@tanstack/react-router';

export const useNavigation = () => {
  const navigate = useNavigate();

  return {
    goHome: () => navigate({to: '/'}),
    goToNewTodo: () => navigate({to: '/new'}),
    goToEditTodo: (todoId: string) => navigate({to: `/edit/$todoId`, params: {todoId}}),
    goToTodoDetail: (todoId: string) => navigate({to: `/detail/$todoId`, params: {todoId}}),
    goToLogin: () => navigate({to: '/login'}),
  };
};
