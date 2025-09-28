import {HStack} from '@chakra-ui/react';
import {Button} from '@ui/Button';
import {EditIcon, DeleteIcon} from '@shared/assets/icons';
import {DetailActionsProps} from '../model';
import {useTranslation} from 'react-i18next';

export function DetailActions(props: DetailActionsProps) {
  const {t} = useTranslation('todos');

  return (
    <HStack spacing="4" pt="4">
      <Button leftIcon={<EditIcon />} variant="primary" onClick={props.onEdit}>
        {t('actions.editTask')}
      </Button>
      <Button leftIcon={<DeleteIcon />} variant="secondary" onClick={props.onDelete}>
        {t('actions.deleteTask')}
      </Button>
    </HStack>
  );
}
