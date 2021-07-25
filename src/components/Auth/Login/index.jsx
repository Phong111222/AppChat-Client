import React from 'react';
import {
  Box,
  FormControl,
  Input,
  Heading,
  Text,
  Center,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { SignIn } from '../../../store/Auth/action';
import { useRouter } from 'next/router';
import FormError from '../../common/FormError';
import CustomButton from '../../common/CustomButton';
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password too short'),
});

export default function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const route = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => dispatch(SignIn(route, data, toast));
  const toast = useToast();
  return (
    <Box
      w='80%'
      h='60%'
      px='50px'
      py='30'
      bg='rgba(255,255,255, 0.95)'
      boxShadow=' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px'
      borderRadius='20px'>
      <Center h='20%'>
        <Heading as='h1' fontSize='50px'>
          AppChat
        </Heading>
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email} mt='50px'>
          <Input
            key={1}
            variant='flushed'
            {...register('email')}
            placeholder='Email'
            _placeholder={{ fontSize: 20 }}
            fontSize='20px'
          />

          <FormError error={errors.email} />
        </FormControl>
        <FormControl isInvalid={errors.password} mt='30px'>
          <Input
            key={2}
            {...register('password')}
            variant='flushed'
            placeholder='Password'
            fontSize='20px'
            type='password'
          />

          <FormError error={errors.password} />
        </FormControl>
        <Link href='/' passHref>
          <Text
            mt='25px'
            color='#7f53ac'
            fontWeight='normal'
            _hover='647dee'
            cursor='pointer'>
            Forgot your password ?
          </Text>
        </Link>
        <CustomButton type='submit' isLoading={loading}>
          Login
        </CustomButton>
      </form>
      <Heading
        as='h4'
        fontSize='14'
        mt='20px'
        color='#7f53ac'
        fontWeight='light'
        display='flex'
        alignItems='baseline'
        justifyContent='center'>
        Don&apos;t have account ?
        <Link href='/register' passHref>
          <Text ml='10px' fontWeight='normal' _hover='647dee' cursor='pointer'>
            Click here
          </Text>
        </Link>
      </Heading>
    </Box>
  );
}
