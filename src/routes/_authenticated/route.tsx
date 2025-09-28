import {createFileRoute} from '@tanstack/react-router';
import {AuthenticatedLayout} from '@app/layouts/AuthenticatedLayout';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({context}) => {
    await context.auth.authGuard();
  },
  component: AuthenticatedLayout,
});
