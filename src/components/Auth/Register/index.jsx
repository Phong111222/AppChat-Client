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
  RadioGroup,
  HStack,
  Radio,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';
import FormError from '../../common/FormError';
import { gender } from '../../../utils/constant';
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Must have at least 5 characters'),
  name: yup
    .string()
    .required('Name is required')
    .min(5, 'Must have at least 5 characters'),
  gender: yup.mixed().required('Gender is required').oneOf(['male', 'female']),
});

export default function Register() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const route = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    setError,
    setFocus,
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(errors.gender);
  const onSubmit = (data) => console.log(data);
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
          SIGN UP
        </Heading>
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name} mt='50px'>
          <Input
            key={1}
            variant='flushed'
            {...register('name')}
            placeholder='Name'
            _placeholder={{ fontSize: 20 }}
            fontSize='20px'
          />

          <FormError error={errors.name} />
        </FormControl>
        <FormControl isInvalid={errors.email} mt='30px' position='relative'>
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
        <FormControl isInvalid={errors.gender} mt='30px'>
          {/* <Controller
            render={({ field: { onChange } }) => {
              return (
                <RadioGroup {...register('gender')} onChange={onChange}>
                  <HStack spacing='24px'>
                    {gender.map((g) => (
                      <Radio value={g}>{g}</Radio>
                    ))}
                  </HStack>
                </RadioGroup>
              );
            }}
            control={control}
          /> */}
          <RadioGroup
            {...register('gender')}
            name='gender'
            onChange={(value) => {
              setValue('gender', value);
            }}>
            <HStack spacing='24px'>
              {gender.map((g) => (
                <Radio key={g} value={g}>
                  {g}
                </Radio>
              ))}
            </HStack>
          </RadioGroup>

          <FormError error={errors.gender} />
        </FormControl>
        <Button
          // disabled={true}
          _hover={{ opacity: 0.8 }}
          _disabled={{ opacity: 0.8, cursor: 'not-allowed' }}
          isLoading={loading}
          mt='40px'
          type='submit'
          w='100%'
          bgGradient='linear(315deg, #7f53ac 0%, #647dee 74%)'
          color='white'
          fontSize='20px'
          h='50px'
          _active={{ opacity: 0.7 }}
          _focus={{ outline: 'none' }}>
          Register
        </Button>
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
        <Link href='/'>
          <Text ml='10px' fontWeight='normal' _hover='647dee' cursor='pointer'>
            Back to Login
          </Text>
        </Link>
      </Heading>
    </Box>
  );
}
