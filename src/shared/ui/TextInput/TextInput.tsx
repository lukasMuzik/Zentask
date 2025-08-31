import {forwardRef} from 'react';
import {Box, Input} from '@chakra-ui/react';
import {InputIcon, TextInputProps} from '.';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({variant = 'default', ...props}, ref) => {
    if (props.rightIcon) {
      return (
        <Box position="relative">
          <Input ref={ref} variant={variant} size="default" {...props} pr="40px" />

          {props.rightIcon && (
            <InputIcon icon={props.rightIcon.icon} onClick={props.rightIcon.onClick} />
          )}
        </Box>
      );
    }

    return <Input ref={ref} variant={variant} size="default" {...props} />;
  }
);

TextInput.displayName = 'TextInput';
