import {forwardRef} from 'react';
import {Box, Input} from '@chakra-ui/react';
import {InputIcon, TextInputProps} from '.';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  if (props.rightIcon) {
    return (
      <Box position="relative">
        <Input pr="40px" ref={ref} {...props} />

        {props.rightIcon && (
          <InputIcon icon={props.rightIcon.icon} onClick={props.rightIcon.onClick} />
        )}
      </Box>
    );
  }

  return <Input ref={ref} {...props} />;
});

TextInput.displayName = 'TextInput';
