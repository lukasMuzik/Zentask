import {VStack} from '@chakra-ui/react';
import {Button} from '@ui/Button';
import {SubmitHandler, useForm} from 'react-hook-form';
import {InputField} from '@form/InputField';
import {AuthFormInputs, authSchema} from '../model';
import {useState} from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import {Link} from '@tanstack/react-router';
import {useAuthentication} from '../hooks/useAuthentication';
import {ForwardIcon, HideIcon, ShowIcon} from '@shared/assets/icons';
import {useTranslation} from 'react-i18next';

interface AuthFormProps {
  variant: 'login' | 'register';
}

export function AuthForm(props: AuthFormProps) {
  const formApi = useForm<AuthFormInputs>({
    resolver: yupResolver(authSchema),
  });
  const {t} = useTranslation('auth');

  const [showPassword, setShowPassword] = useState(false);
  const {authenticate} = useAuthentication();

  const onSubmit: SubmitHandler<AuthFormInputs> = async (data) => {
    await authenticate(data, props.variant);
  };

  return (
    <VStack as="form" spacing="2.5rem" align="stretch" onSubmit={formApi.handleSubmit(onSubmit)}>
      <VStack spacing="1.5rem">
        <InputField
          control={formApi.control}
          isRequired
          label={t('authForm.username')}
          name="username"
        />

        <InputField
          control={formApi.control}
          label={t('authForm.password')}
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
          {props.variant === 'register'
            ? t('authForm.buttons.register')
            : t('authForm.buttons.login')}
        </Button>

        <Link to={props.variant === 'register' ? '/login' : '/register'}>
          {props.variant === 'register' ? (
            <>{t('authForm.alreadyHaveAccount')}</>
          ) : (
            <>{t('authForm.dontHaveAccount')}</>
          )}
        </Link>
      </VStack>
    </VStack>
  );
}
