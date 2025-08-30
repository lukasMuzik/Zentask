import {Text, TextProps} from '@chakra-ui/react';

export function ErrorMessage({children, ...props}: TextProps) {
  return (
    <Text
      fontSize="text.small"
      fontWeight="text.base"
      color="text-danger"
      lineHeight="20px"
      {...props}
    >
      {children}
    </Text>
  );
}
