import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import CustomAvatar from './CustomAvatar';

export default function FriendRequestItem({ active, name, isOnline, userId }) {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
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
          h='30px'>
          Accept
        </Button>
        <Button h='30px' fontSize='10px' fontWeight='bold' isLoading={deleting}>
          Deny
        </Button>
      </Flex>
    </Flex>
  );
}
