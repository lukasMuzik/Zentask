import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {NewTodoContent} from './ui/NewTodoContent';

export function NewTodoPage() {
  const {t} = useTranslation('common');

  return (
    <>
      <Helmet>
        <title>{t('pages.newTask')}</title>
      </Helmet>

      <NewTodoContent />
    </>
  );
}
