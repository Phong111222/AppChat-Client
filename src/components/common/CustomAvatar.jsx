import { Avatar, AvatarBadge } from '@chakra-ui/react';
import React from 'react';

export default function CustomAvatar({ w, h, src, propsBadge, isOnline }) {
  return (
    <Avatar w={w} h={h} src={src}>
      <AvatarBadge
        {...propsBadge}
        boxSize='10px'
        right='5px'
        bottom='3px'
        border='none'
        bg={isOnline ? 'green.500' : 'gray'}
        boxSize='15px'
        border='2px solid white'
      />
    </Avatar>
  );
}
