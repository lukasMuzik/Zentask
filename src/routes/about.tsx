import {createFileRoute} from '@tanstack/react-router';
import {Text} from '@chakra-ui/react';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  return <Text>Hello from About!</Text>;
}
