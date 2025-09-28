import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {EditTodoContent} from './ui/EditTodoContent';

export function EditTodoPage() {
  const {t} = useTranslation('common');

  return (
    <>
      <Helmet>
        <title>{t('pages.editTask')}</title>
      </Helmet>

      <EditTodoContent />
    </>
  );
}
