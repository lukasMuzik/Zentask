import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {RegisterContent} from './ui/RegisterContent';

export function RegisterPage() {
  const {t} = useTranslation('common');

  return (
    <>
      <Helmet>
        <title>{t('pages.register')}</title>
      </Helmet>

      <RegisterContent />
    </>
  );
}
