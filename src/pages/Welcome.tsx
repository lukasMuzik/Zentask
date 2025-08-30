import {Center, Link, Text, VStack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {Button} from '../shared/ui/Button/Button';
import {ReactComponent as AddIcon} from '../assets/icons/icon-add.svg';

const API_DOCS_HREF = 'http://localhost:3001/api/docs';

export function Welcome() {
  const {t} = useTranslation();

  return (
    <Center height="100vh" width="100wv" padding="10">
      <VStack gap="10px">
        <Text fontSize="2xl" color="blue.900">
          {t('welcome.message')}
        </Text>
        <Link color="blue.400" href={API_DOCS_HREF} target="_blank">
          {t('welcome.link')}
        </Link>
        <Button leftIcon={<AddIcon />}>Click me</Button>
      </VStack>
    </Center>
  );
}
