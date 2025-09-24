import {createFileRoute} from '@tanstack/react-router';
import {UnauthenticatedLayout} from '@app/layouts/UnauthenticatedLayout';

export const Route = createFileRoute('/_unauthenticated')({
  component: UnauthenticatedLayout,
});
