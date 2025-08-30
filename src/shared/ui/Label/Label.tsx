import {ReactNode} from 'react';
import {Flex, Text, FlexProps} from '@chakra-ui/react';

export interface LabelProps extends FlexProps {
  children: ReactNode;
  mandatory?: boolean;
  htmlFor?: string;
}

export function Label({children, mandatory = false, htmlFor, ...props}: LabelProps) {
  return (
    <Flex
      as="label"
      htmlFor={htmlFor}
      direction="row"
      align="center"
      gap="4px"
      lineHeight="20px"
      fontSize="text.small"
      fontWeight="text.base"
      color="text-secondary"
      {...props}
    >
      {mandatory && (
        <Text as="span" color="text-danger" fontSize="inherit">
          *
        </Text>
      )}
      <Text>{children}</Text>
    </Flex>
  );
}
