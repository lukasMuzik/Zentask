import {Box, Flex, VStack} from '@chakra-ui/react';
import {InputField} from '@form/InputField';
import {TextareaField} from '@form/TextareaField';
import {Button} from '@ui/Button';
import {TodoFormProps} from './model';
import {CheckIcon} from '@shared/assets/icons';

export function TodoForm(props: TodoFormProps) {
  return (
    <Box as="form" onSubmit={props.formApi.handleSubmit(props.onSubmit)}>
      <VStack spacing="1rem" mb="2.5rem">
        <InputField control={props.formApi.control} isRequired label="Task name" name="title" />

        <TextareaField
          control={props.formApi.control}
          label="Description (optional)"
          name="description"
        />
      </VStack>

      <Flex justify="space-between">
        <Button type="button" variant="secondary" onClick={() => window.history.back()}>
          {props.secondaryButtonText}
        </Button>
        <Button type="submit" rightIcon={<CheckIcon />}>
          {props.submitButtonText}
        </Button>
      </Flex>
    </Box>
  );
}
