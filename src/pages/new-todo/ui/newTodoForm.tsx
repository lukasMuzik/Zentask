import {Box, Flex, VStack} from '@chakra-ui/react';
import {Button} from '@ui/Button';
import {InputField} from '@form/InputField';
import {SubmitHandler, useForm} from 'react-hook-form';
import {TextareaField} from '@form/TextareaField';
import {useNavigate} from '@tanstack/react-router';
import {NewTodoFormData, newTodoSchema} from '../model/schema';
import {yupResolver} from '@hookform/resolvers/yup';
import {useCreateTodoMutation} from '../api/createTaskMutation';

export function NewTodoForm() {
  const formApi = useForm<NewTodoFormData>({
    resolver: yupResolver(newTodoSchema),
  });
  const navigate = useNavigate();
  const createTodoMutation = useCreateTodoMutation();

  const handleBack = () => {
    navigate({to: '..'});
  };

  const onSubmit: SubmitHandler<NewTodoFormData> = (data) => {
    createTodoMutation.mutate(data);
  };

  return (
    <Box as="form" onSubmit={formApi.handleSubmit(onSubmit)}>
      <VStack spacing="1rem" mb="2.5rem">
        <InputField control={formApi.control} isRequired label="Task name" name="title" />

        <TextareaField
          control={formApi.control}
          label="Description (optional)"
          name="description"
        />
      </VStack>

      <Flex justify="space-between">
        <Button type="button" variant="secondary" onClick={handleBack}>
          Discard
        </Button>
        <Button type="submit">Create task</Button>
      </Flex>
    </Box>
  );
}
