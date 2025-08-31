import {InputProps} from '@chakra-ui/react';
import {ReactElement} from 'react';

export interface InputIconType {
  icon: ReactElement;
  onClick?: () => void;
}

export interface TextInputProps extends Omit<InputProps, 'variant' | 'size'> {
  rightIcon?: InputIconType;
}
