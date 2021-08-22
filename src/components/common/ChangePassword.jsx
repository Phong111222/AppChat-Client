import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useContext, useRef } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import AxiosConfig, { baseURL } from '../../utils/constant';
import FormError from './FormError';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getToken } from '../../utils/getToken';
import { User } from '../../utils/endpoints';
import { Logout } from '../../store/Auth/action';
import SocketContext from '../../Context/SocketContext';
import { useRouter } from 'next/router';
const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password too short'),
  new_password: yup
    .string()
    .required('New password is required')
    .min(8, 'Password too short'),
});
const ChangePassword = () => {
  const { info } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const route = useRouter();
  const socket = useContext(SocketContext);
  const toast = useToast();

  const onSubmit = async (data) => {
    const { password, new_password } = data;

    try {
      await AxiosConfig.patch(
        User.CHANGE_PASSWORD(info._id),
        {
          password,
          new_password,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      socket.disconnect();
      dispatch(Logout(route, info));
    } catch (error) {
      const {
        data: {
          message: { message },
        },
      } = error.response;
      toast({
        status: 'error',
        description: message,
        duration: 2000,
      });
    }
  };
  return (
    <Box>
      <Center>
        <Avatar
          boxShadow='rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
          src={`${baseURL}/upload/${info?.avatar}`}
          size='xl'
        />
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors?.password} mt='50px'>
          <Input
            name='password'
            key={2}
            {...register('password')}
            variant='flushed'
            placeholder='password'
            fontSize='20px'
            type='password'
          />

          <FormError error={errors?.password} />
        </FormControl>
        <FormControl isInvalid={errors?.new_password} mt='30px'>
          <Input
            name='password'
            key={2}
            {...register('new_password')}
            variant='flushed'
            placeholder='New password'
            fontSize='20px'
            type='password'
          />

          <FormError error={errors?.new_password} />
        </FormControl>
        <FormControl mt='35px'>
          <Button type='submit' fontSize='15px'>
            Change password
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default ChangePassword;
