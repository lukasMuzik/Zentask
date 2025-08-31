import {createFileRoute} from '@tanstack/react-router';
import {Welcome} from '../pages/Welcome';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return <Welcome />;
}
