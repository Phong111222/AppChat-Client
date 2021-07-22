import React from 'react';
import {
  Box,
  Button,
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
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function index() {
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
      h='80%'
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

        <Box>
          <Button
            // disabled={true}
            _hover={{ opacity: 0.8 }}
            _disabled={{ opacity: 0.8, cursor: 'not-allowed' }}
            isLoading={loading}
            mt='50px'
            type='submit'
            w='100%'
            bgGradient='linear(315deg, #7f53ac 0%, #647dee 74%)'
            color='white'
            fontSize='20px'
            h='50px'
            _active={{ opacity: 0.7 }}
            _focus={{ outline: 'none' }}>
            Login
          </Button>
        </Box>
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
        Don't have account ?
        <Link href='/register'>
          <Text ml='10px' fontWeight='normal' _hover='647dee' cursor='pointer'>
            Click here
          </Text>
        </Link>
      </Heading>
    </Box>
  );
}
