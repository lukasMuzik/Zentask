import {forwardRef} from 'react';
import {Input, InputProps} from '@chakra-ui/react';

export interface TextInputProps extends Omit<InputProps, 'variant'> {
  variant?: 'default' | 'error';
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({variant = 'default', ...props}, ref) => (
    <Input ref={ref} variant={variant} size="default" {...props} />
  )
);

TextInput.displayName = 'TextInput';
