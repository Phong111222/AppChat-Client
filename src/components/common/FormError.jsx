import { FormErrorMessage } from '@chakra-ui/form-control';

export default function FormError({ error }) {
  return <>{error && <FormErrorMessage>{error.message}</FormErrorMessage>}</>;
}
