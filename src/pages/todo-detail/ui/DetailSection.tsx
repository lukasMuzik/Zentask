import {VStack, Text} from '@chakra-ui/react';
import {DetailSectionProps} from '../model';

export function DetailSection(props: DetailSectionProps) {
  return (
    <VStack align="stretch" spacing="3">
      <Text fontSize="lg" fontWeight="medium" color="text-primary">
        {props.title}
      </Text>
      {props.children}
    </VStack>
  );
}
