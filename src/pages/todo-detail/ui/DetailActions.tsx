import {HStack} from '@chakra-ui/react';
import {Button} from '@ui/Button';
import {EditIcon, DeleteIcon} from '@shared/assets/icons';
import {DetailActionsProps} from '../model';
import {useTranslation} from 'react-i18next';
import {useIsMobile} from '@shared/hooks/useIsMobile';

export function DetailActions(props: DetailActionsProps) {
  const {t} = useTranslation('todos');
  const isMobile = useIsMobile();

  return (
    <HStack justify="space-between" pt="4">
      <Button leftIcon={<DeleteIcon />} variant="secondary" onClick={props.onDelete}>
        {isMobile ? t('actions.delete') : t('actions.deleteTask')}
      </Button>

      <Button leftIcon={<EditIcon />} variant="primary" onClick={props.onEdit}>
        {isMobile ? t('actions.edit') : t('actions.editTask')}
      </Button>
    </HStack>
  );
}
