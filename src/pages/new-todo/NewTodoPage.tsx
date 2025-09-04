import {Flex, Text, VStack} from '@chakra-ui/react';
import {Button} from '@ui/Button';
import {NewTodoForm} from './ui/newTodoForm';
import {BackwardsIcon} from '../../assets/icons';
import {useNavigate} from '@tanstack/react-router';

export function NewTodoPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({to: '..'});
  };

  return (
    <VStack w="full" align="stretch" spacing="2.5rem">
      <Flex as="header" align="center" gap="1.5rem">
        <Button onClick={handleBack} iconOnly={<BackwardsIcon />} variant="secondary" />

        <Text fontSize="heading.2" fontWeight="heading.1">
          New Task
        </Text>
      </Flex>

      <NewTodoForm />
    </VStack>
  );
}
