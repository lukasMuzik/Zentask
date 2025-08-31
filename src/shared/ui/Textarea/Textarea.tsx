import {forwardRef} from 'react';
import {Textarea} from '@chakra-ui/react';
import {TextareaComponentProps} from '.';

export const TextareaComponent = forwardRef<HTMLTextAreaElement, TextareaComponentProps>(
  (props, ref) => <Textarea ref={ref} {...props} />
);

TextareaComponent.displayName = 'TextareaComponent';
