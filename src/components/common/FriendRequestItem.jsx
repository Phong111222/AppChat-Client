import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AcceptFriendRequest, DeleteRequest } from '../../store/Friend/action';
import AxiosConfig from '../../utils/constant';
import { Friend } from '../../utils/endpoints';
import { getToken } from '../../utils/getToken';
import CustomAvatar from './CustomAvatar';

export default function FriendRequestItem({ active, name, isOnline, userId }) {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.service);
  const handleDeny = async () => {
    try {
      dispatch(DeleteRequest(userId));
      console.log(userId);
      await AxiosConfig.delete(Friend.DELETE_REQUEST(userId), {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    } catch (error) {}
  };
  const handleAccept = async () => {
    try {
      dispatch(AcceptFriendRequest(userId));
      socket.emit('send-accept-request', { userAccepted: info, userId });
      await AxiosConfig.patch(Friend.ACCEPT_REQUEST(userId), null, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    } catch (error) {}
  };
  return (
    <Flex
      _hover={
        !active && {
          background: 'rgba(206, 206, 206,0.3)',
        }
      }
      cursor='pointer'
      background={active && 'rgba(90, 95, 255,0.7)'}
      h='10%'
      overflow='hidden'
      justifyContent='space-between'
      alignItems='center'
      px='10px'
      position='relative'>
      <Flex alignItems='center'>
        <CustomAvatar
          isOnline={isOnline}
          w='60px'
          h='60px'
          src='https://i1.sndcdn.com/avatars-000214125831-5q6tdw-t500x500.jpg'
        />

        <Text
          mb='0'
          lineHeight='1'
          textOverflow='ellipsis'
          fontSize='18px'
          ml='10px'>
          {name}
        </Text>
      </Flex>
      <Flex>
        <Button
          fontSize='10px'
          fontWeight='bold'
          mr='5px'
          background='rgba(90, 95, 255,.7)'
          _hover='rgba(206, 206, 206,0.3)'
          color='white'
          h='30px'
          onClick={handleAccept}>
          Accept
        </Button>
        <Button h='30px' fontSize='10px' fontWeight='bold' onClick={handleDeny}>
          Deny
        </Button>
      </Flex>
    </Flex>
  );
}
