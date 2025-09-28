import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {LoginContent} from './ui/LoginContent';

export function LoginPage() {
  const {t} = useTranslation('common');

  return (
    <>
      <Helmet>
        <title>{t('pages.login')}</title>
      </Helmet>

      <LoginContent />
    </>
  );
}
