import {Box, Text} from '@chakra-ui/react';
import {AuthForm} from '@features/auth/ui/AuthForm';
import {useTranslation} from 'react-i18next';

export function RegisterContent() {
  const {t} = useTranslation('auth');

  return (
    <>
      <Box mb="2.5rem">
        <Text as="h1" fontSize="heading.1" fontWeight="heading.1" mb="1.5rem" lineHeight="2rem">
          {t('register.title')}
        </Text>

        <Text color="text-secondary" lineHeight="1.5rem" fontSize="text.base">
          {t('register.description')}
        </Text>
      </Box>

      <AuthForm variant="register" />
    </>
  );
}
