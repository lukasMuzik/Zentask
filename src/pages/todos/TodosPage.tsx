import {Box, Flex, VStack, Text} from '@chakra-ui/react';
import {Helmet} from 'react-helmet-async';
import {Button} from '@ui/Button';
import {TodosContent} from './ui/TodosContent';
import {useAuth} from '@app/providers/AuthProvider/AuthProvider';
import {getFormattedDate} from '@shared/utils/formatters/dateFormatter/dateFormatter';
import {AddIcon} from '@shared/assets/icons';
import {useNavigation} from '@shared/hooks/useNavigation';
import {useTranslation} from 'react-i18next';

export function TodosPage() {
  const {goToNewTodo} = useNavigation();
  const {user} = useAuth();
  const {t} = useTranslation('common');

  return (
    <>
      <Helmet>
        <title>{t('pages.todos')}</title>
      </Helmet>

      <VStack w="full" align="stretch" spacing="2.5rem">
        <Flex as="header" align="center" justify="space-between">
          <Box>
            <Text as="h1" fontSize="heading.2" fontWeight="heading.2" mb="0.5rem">
              {t('greeting.hello', {username: user?.username})}
            </Text>

            <Text color="text-secondary" fontSize="text.small">
              {getFormattedDate()}
            </Text>
          </Box>

          <Box pb="1.5rem" pl="1rem">
            <Button onClick={goToNewTodo} rightIcon={<AddIcon />}>
              {t('buttons.newTask')}
            </Button>
          </Box>
        </Flex>

        <TodosContent />
      </VStack>
    </>
  );
}
