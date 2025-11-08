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
  dataTestId?: string;
}

export function Button({
  dataTestId,
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
      <ChakraButton data-testid={dataTestId} variant={variant} size="icon" {...props}>
        {iconOnly}
      </ChakraButton>
    );
  }

  return (
    <ChakraButton
      data-testid={dataTestId}
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
