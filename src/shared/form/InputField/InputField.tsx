import {FieldValues, useController, UseControllerProps} from 'react-hook-form';
import {FormControl} from '../FormControl/FormControl';
import {TextInput, TextInputProps} from '../../ui/TextInput/TextInput';

export type TextInputFieldProps<FormData extends FieldValues> = UseControllerProps<FormData> &
  Omit<TextInputProps, 'variant' | 'onChange' | 'onBlur' | 'value'> & {
    label?: string;
    helperText?: string;
  };

export function InputField<FormData extends FieldValues>(props: TextInputFieldProps<FormData>) {
  const {field, fieldState} = useController({
    control: props.control,
    defaultValue: props.defaultValue,
    name: props.name,
    shouldUnregister: props.shouldUnregister,
  });

  return (
    <FormControl
      label={props.label}
      isRequired={props.isRequired}
      errorText={fieldState.error?.message}
      helperText={props.helperText}
      name={props.name}
    >
      <TextInput
        autoComplete={props.autoComplete}
        name={field.name}
        value={field.value ?? ''}
        onChange={field.onChange}
        onBlur={field.onBlur}
        ref={field.ref}
        placeholder={props.placeholder}
        type={props.type}
        variant={fieldState.error ? 'error' : 'default'}
      />
    </FormControl>
  );
}
