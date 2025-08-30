import {Checkbox as ChakraCheckbox, CheckboxProps as ChakraCheckboxProps} from '@chakra-ui/react';

interface CheckboxProps extends Pick<ChakraCheckboxProps, 'onChange' | 'id'> {}

export function Checkbox(props: CheckboxProps) {
  return <ChakraCheckbox id={props.id} onChange={props.onChange} />;
}
