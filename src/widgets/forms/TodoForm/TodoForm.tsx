import {Box, Flex, VStack} from '@chakra-ui/react';
import {InputField} from '@form/InputField';
import {TextareaField} from '@form/TextareaField';
import {Button} from '@ui/Button';
import {TodoFormProps} from './model';
import {AddIcon, CheckIcon} from '@shared/assets/icons';
import {useTranslation} from 'react-i18next';

export function TodoForm(props: TodoFormProps) {
  const {t} = useTranslation('todos');
  const {variant = 'create'} = props;

  return (
    <Box as="form" onSubmit={props.formApi.handleSubmit(props.onSubmit)}>
      <VStack spacing="1rem" mb="2.5rem">
        <InputField
          control={props.formApi.control}
          isRequired
          label={t('forms.taskName')}
          name="title"
        />

        <TextareaField
          control={props.formApi.control}
          label={t('forms.description')}
          name="description"
        />
      </VStack>

      <Flex justify="space-between">
        <Button type="button" variant="secondary" onClick={() => window.history.back()}>
          {props.secondaryButtonText}
        </Button>
        <Button type="submit" rightIcon={variant === 'create' ? <AddIcon /> : <CheckIcon />}>
          {props.submitButtonText}
        </Button>
      </Flex>
    </Box>
  );
}
