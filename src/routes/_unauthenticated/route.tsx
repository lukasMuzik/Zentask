import {createFileRoute} from '@tanstack/react-router';
import {UnauthenticatedLayout} from '../../widgets/layouts/UnauthenticatedLayout';

export const Route = createFileRoute('/_unauthenticated')({
  component: UnauthenticatedLayout,
});
