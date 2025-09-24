import {Button} from '@ui/Button';
import {BackwardsIcon} from '@shared/assets/icons';
import {Flex, Text} from '@chakra-ui/react';
import {TodoFormHeaderProps} from './model';

export function TodoFormHeader(props: TodoFormHeaderProps) {
  return (
    <Flex as="header" align="center" gap="1.5rem">
      <Button onClick={props.handleBack} iconOnly={<BackwardsIcon />} variant="secondary" />

      <Text fontSize="heading.2" fontWeight="heading.1">
        {props.title}
      </Text>
    </Flex>
  );
}
