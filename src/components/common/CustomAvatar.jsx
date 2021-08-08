import { Avatar, AvatarBadge } from '@chakra-ui/react';
import React from 'react';

export default function CustomAvatar({ w, h, src, isOnline, propsBadge }) {
  return (
    <Avatar w={w} h={h} src={src}>
      <AvatarBadge
        right='5px'
        bottom='3px'
        bg={isOnline ? 'green.500' : 'gray'}
        boxSize='15px'
        border='2px solid white'
        {...propsBadge}
      />
    </Avatar>
  );
}
