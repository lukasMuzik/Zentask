import {Box, VStack} from '@chakra-ui/react';
import {Label} from '../../ui/Label';
import {HelperText} from '../../ui/HelperText';
import {ReactNode} from 'react';

export interface Props {
  children: ReactNode;
  name: string;
  label?: string;
  helperText?: string;
  errorText?: string;
  isRequired?: boolean;
}

export function FormControl({
  children,
  label,
  helperText,
  errorText,
  isRequired = false,
  name,
}: Props) {
  return (
    <VStack w="full" spacing="4px" align="stretch">
      {label && (
        <Label htmlFor={name} mandatory={isRequired}>
          {label}
        </Label>
      )}

      <Box>{children}</Box>

      {helperText && <HelperText>{helperText}</HelperText>}

      {errorText && <HelperText>{errorText}</HelperText>}
    </VStack>
  );
}
