import {createFileRoute, useParams} from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/edit/$todoId')({
  component: RouteComponent,
});

function RouteComponent() {
  const {todoId} = useParams({from: '/_authenticated/edit/$todoId'});
  return <div>Hello "/_authenticated/edit/{todoId}"!</div>;
}
