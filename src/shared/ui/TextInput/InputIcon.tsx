import {Box} from '@chakra-ui/react';
import {InputIconType} from '.';

export function InputIcon(props: InputIconType) {
  return (
    <Box
      data-testid="input-icon-button"
      onClick={props.onClick}
      position="absolute"
      right="16px"
      top="50%"
      transform="translateY(-50%)"
    >
      {props.icon}
    </Box>
  );
}
