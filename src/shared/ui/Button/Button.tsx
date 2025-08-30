import {ReactElement, ReactNode} from 'react';
import {Button as ChakraButton, ButtonProps as ChakraButtonProps} from '@chakra-ui/react';

export interface ButtonProps
  extends Omit<ChakraButtonProps, 'variant' | 'size' | 'leftIcon' | 'rightIcon'> {
  variant?: 'primary' | 'secondary' | 'textOnly';
  size?: 'default' | 'icon';
  children?: ReactNode;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  iconOnly?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'default',
  children,
  leftIcon,
  rightIcon,
  iconOnly,
  ...props
}: ButtonProps) {
  if (iconOnly) {
    return (
      <ChakraButton variant={variant} size="icon" {...props}>
        {iconOnly}
      </ChakraButton>
    );
  }

  return (
    <ChakraButton
      leftIcon={leftIcon || undefined}
      rightIcon={rightIcon || undefined}
      variant={variant}
      size={size}
      {...props}
    >
      {children}
    </ChakraButton>
  );
}
