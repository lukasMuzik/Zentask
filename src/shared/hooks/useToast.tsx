import {useToast as useChakraToast, UseToastOptions} from '@chakra-ui/react';

const DEFAULT_TOAST_OPTIONS: UseToastOptions = {
  duration: 3000,
  isClosable: true,
};

type ToastFn = (
  description: string,
  options?: Omit<UseToastOptions, 'description' | 'status'>
) => string | number;

export const useToast = () => {
  const toast = useChakraToast();

  const emit =
    (status: UseToastOptions['status']): ToastFn =>
    (description, options) =>
      toast({
        ...DEFAULT_TOAST_OPTIONS,
        status,
        description,
        ...options,
      });

  return {
    info: emit('info'),
    success: emit('success'),
    warning: emit('warning'),
    error: emit('error'),
    loading: emit('loading'),
    custom: (options: UseToastOptions) => toast({...DEFAULT_TOAST_OPTIONS, ...options}),
    close: toast.close,
    closeAll: toast.closeAll,
    update: toast.update,
    isActive: toast.isActive,
  };
};

export default useToast;
