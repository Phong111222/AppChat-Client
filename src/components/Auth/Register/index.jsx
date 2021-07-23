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
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../common/CustomButton';
import { useRouter } from 'next/router';
import FormError from '../../common/FormError';
import { gender } from '../../../utils/constant';
import { SignUp } from '../../../store/Auth/action';
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Must have at least 8 characters'),
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
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toast = useToast();
  const onSubmit = async (data) => await dispatch(SignUp(route, data, toast));
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
        <CustomButton type='submit' loading={loading} mt='40px'>
          Register
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
        <Link href='/' passHref>
          <Text ml='10px' fontWeight='normal' _hover='647dee' cursor='pointer'>
            Back to Login
          </Text>
        </Link>
      </Heading>
    </Box>
  );
}
