import {VStack} from '@chakra-ui/react';
import {Button} from '@ui/Button';
import {SubmitHandler, useForm} from 'react-hook-form';
import {InputField} from '@form/InputField';
import {AuthFormInputs, authSchema} from '../model';
import {useState} from 'react';
// todo will add @aliases
import {HideIcon, ShowIcon, ForwardIcon} from '../../../assets/icons';
import {yupResolver} from '@hookform/resolvers/yup';
import {Link} from '@tanstack/react-router';
import {useLoginMutation} from '../api/useLoginMutation';
import {useRegisterMutation} from '../api/useRegisterMutation';

interface AuthFormProps {
  variant: 'login' | 'register';
}

export function AuthForm(props: AuthFormProps) {
  const formApi = useForm<AuthFormInputs>({
    resolver: yupResolver(authSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const onSubmit: SubmitHandler<AuthFormInputs> = (data) => {
    if (props.variant === 'register') {
      console.log('Registering');
      registerMutation.mutate(data);
      return;
    }

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

      <VStack gap="0.25rem" align="stretch">
        <Button type="submit" w="full" rightIcon={<ForwardIcon />}>
          {props.variant === 'register' ? 'Register' : 'Log in'}
        </Button>
        <Link to={props.variant === 'register' ? '/login' : '/register'}>
          {props.variant === 'register'
            ? 'Already have an account? Login!'
            : "Don't have an account yet? Register!"}
        </Link>
      </VStack>
    </VStack>
  );
}
