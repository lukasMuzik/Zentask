import {FieldValues, useController, UseControllerProps} from 'react-hook-form';
import {FormControl} from '@form/FormControl';
import {TextInput, TextInputProps} from '@ui/TextInput';

export type TextInputFieldProps<FormData extends FieldValues> = UseControllerProps<FormData> &
  Omit<TextInputProps, 'variant' | 'onChange' | 'onBlur' | 'value' | 'isInvalid'> & {
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
        onBlur={field.onBlur}
        onChange={field.onChange}
        placeholder={props.placeholder}
        ref={field.ref}
        rightIcon={props.rightIcon}
        type={props.type}
        value={field.value ?? ''}
        isInvalid={!!fieldState.error}
        isDisabled={props.isDisabled}
      />
    </FormControl>
  );
}
