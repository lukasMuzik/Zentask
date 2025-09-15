import {HStack} from '@chakra-ui/react';
import {Button} from '@ui/Button';
import {EditIcon, DeleteIcon} from '../../../shared/assets/icons';
import {DetailActionsProps} from '../model';

export function DetailActions(props: DetailActionsProps) {
  return (
    <HStack spacing="4" pt="4">
      <Button leftIcon={<EditIcon />} variant="primary" onClick={props.onEdit}>
        Upravit úkol
      </Button>
      <Button leftIcon={<DeleteIcon />} variant="secondary" onClick={props.onDelete}>
        Smazat úkol
      </Button>
    </HStack>
  );
}
