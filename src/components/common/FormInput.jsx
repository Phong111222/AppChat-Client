import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

const FormInput = ({ name, placeholder, props }) => {
  const { register } = useFormContext();
  return <Input {...props} placeholder={placeholder} {...register(name)} />;
};

export default FormInput;
