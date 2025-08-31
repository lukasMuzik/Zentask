import {Center, Input, Link, Text, VStack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {Button} from '@ui/Button';
import {Label} from '@ui/Label';
import {HelperText} from '@ui/HelperText';
import {ErrorMessage} from '@ui/ErrorMessage';
import {useForm} from 'react-hook-form';
import {InputField} from '../shared/form/InputField/InputField';
import {Checkbox} from '@ui/Checkbox';
import {AddIcon, HideIcon, ShowIcon} from '../assets/icons';
import {useState} from 'react';

const API_DOCS_HREF = 'http://localhost:3001/api/docs';

export function Welcome() {
  const {t} = useTranslation();
  const {control} = useForm<{email: string}>();
  const [showPassword, setShowPassword] = useState(false);

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

        <Label mandatory>Label</Label>

        <HelperText>Helper text message.</HelperText>

        <ErrorMessage>Error message placeholder.</ErrorMessage>

        <Input placeholder="Placeholder" />

        <InputField
          control={control}
          helperText="Helper text message."
          label="Label"
          name="email"
          placeholder="Placeholder"
        />

        <Checkbox onChange={(e) => console.log(e.target.checked)} />

        <InputField
          control={control}
          helperText="Helper text message."
          label="Label"
          name="email"
          placeholder="Placeholder"
          type={showPassword ? 'text' : 'password'}
          rightIcon={{
            icon: showPassword ? <ShowIcon /> : <HideIcon />,
            onClick: () => setShowPassword((prev) => !prev),
          }}
        />
      </VStack>
    </Center>
  );
}
