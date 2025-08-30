import {Text, TextProps} from '@chakra-ui/react';

export function HelperText({children, ...props}: TextProps) {
  return (
    <Text
      fontSize="text.small"
      fontWeight="text.base"
      color="text-tertiary"
      lineHeight="20px"
      {...props}
    >
      {children}
    </Text>
  );
}
