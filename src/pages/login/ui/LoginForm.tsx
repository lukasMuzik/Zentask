import {VStack} from '@chakra-ui/react';
import {Button} from '@ui/Button';
import {SubmitHandler, useForm} from 'react-hook-form';
import {InputField} from '@form/InputField';
import {LoginFormData, loginSchema} from '../model';
import {useState} from 'react';
// todo will add @aliases
import {HideIcon, ShowIcon, ForwardIcon} from '../../../assets/icons';
import {LOGIN_DEFAULT_VALUES} from '../lib/constants';
import {yupResolver} from '@hookform/resolvers/yup';
import {useLoginMutation} from '../api/useLoginMutation';

export function LoginForm() {
  const formApi = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: LOGIN_DEFAULT_VALUES,
  });
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <VStack as="form" spacing="2.5rem" align="stretch" onSubmit={formApi.handleSubmit(onSubmit)}>
      <VStack spacing="1.5rem">
        <InputField control={formApi.control} isRequired label="Username" name="username" />

        <InputField
          control={formApi.control}
          label="Password"
          name="password"
          isRequired
          type={showPassword ? 'text' : 'password'}
          rightIcon={{
            icon: showPassword ? <ShowIcon /> : <HideIcon />,
            onClick: () => setShowPassword((prev) => !prev),
          }}
        />
      </VStack>

      <Button type="submit" w="full" rightIcon={<ForwardIcon />}>
        Log in
      </Button>
    </VStack>
  );
}
