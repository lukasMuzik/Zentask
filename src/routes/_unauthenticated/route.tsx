import {createFileRoute} from '@tanstack/react-router';
import {AuthLayout} from '../../widgets/Auth/AuthLayout';

export const Route = createFileRoute('/_unauthenticated')({
  component: AuthLayout,
});
