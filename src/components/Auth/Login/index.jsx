import React from 'react';
import {
  Flex,
  Box,
  Button,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Heading,
  Image,
  Text,
  Center,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});
const MotionBox = motion(Box);

export default function index() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <Flex bgGradient='linear(315deg, #7f53ac 0%, #647dee 74%)'>
      <MotionBox
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        flex='1.5'
        transition={{
          duration: 0.5,
          type: 'interia',
        }}
        display='flex'
        alignItems='center'
        justifyContent='center'
        position='ralative'>
        <Image
          src='/img/background-2.svg'
          w='80%'
          position='absolute'
          bottom='0'
        />

        <MotionBox
          initial={{ opacity: 0, y: 10, x: 0 }}
          animate={{ opacity: 1, y: -70, x: '0' }}
          transition={{ delay: 0.5 }}>
          <Heading
            as='h2'
            fontSize={100}
            color='white'
            bgGradient='linear(to-l, white,#FFFAFA)'
            bgClip='text'
            textShadow='dark-lg'
            fontWeight='extrabold'>
            APPCHAT
          </Heading>
        </MotionBox>
        <MotionBox
          initial={{ opacity: 0, y: 80, x: 0 }}
          animate={{ opacity: 1, y: 30, x: -30 }}
          transition={{ delay: 1 }}>
          <Text fontSize={30} fontWeight='semibold' textShadow='dark-lg'>
            Let's chat !
          </Text>
        </MotionBox>
      </MotionBox>
      <MotionBox
        initial={{ x: '100vw' }}
        animate={{ x: 0 }}
        flex='1'
        h='100vh'
        // bg='#FFFAFA'
        transition={{
          duration: 0.5,
          type: 'tween',
        }}
        display='flex'
        alignItems='center'
        justifyContent='center'
        p={10}>
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
                variant='flushed'
                {...register('email')}
                placeholder='Email'
                _placeholder={{ fontSize: 20 }}
                fontSize='20px'
              />
              {errors.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.password} mt='30px'>
              <Input
                {...register('password')}
                variant='flushed'
                placeholder='Password'
                fontSize='20px'
                type='password'
              />
              {errors.password && (
                <FormErrorMessage>{errors.password.password}</FormErrorMessage>
              )}
            </FormControl>

            <Box>
              <Button
                // disabled={true}
                _hover={{ opacity: 0.8 }}
                _disabled={{ opacity: 0.8, cursor: 'not-allowed' }}
                isLoading={false}
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
            <Text
              ml='10px'
              fontWeight='normal'
              _hover='647dee'
              cursor='pointer'>
              Click here
            </Text>
          </Heading>
        </Box>
      </MotionBox>
    </Flex>
  );
}
