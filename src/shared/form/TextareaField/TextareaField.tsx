import {FieldValues, useController, UseControllerProps} from 'react-hook-form';
import {FormControl} from '@form/FormControl';
import {TextareaComponent, TextareaComponentProps} from '@ui/Textarea';

export type TextareaFieldProps<FormData extends FieldValues> = UseControllerProps<FormData> &
  Omit<TextareaComponentProps, 'variant' | 'onChange' | 'onBlur' | 'value'> & {
    label?: string;
    helperText?: string;
  };

export function TextareaField<FormData extends FieldValues>(props: TextareaFieldProps<FormData>) {
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
      <TextareaComponent
        name={field.name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        placeholder={props.placeholder}
        ref={field.ref}
        rows={props.rows}
        cols={props.cols}
        resize={props.resize}
        value={field.value ?? ''}
        isInvalid={!!fieldState.error}
        isDisabled={props.isDisabled}
      />
    </FormControl>
  );
}
