import { Avatar, Box, Flex } from '@chakra-ui/react';
import React from 'react';
const Message = React.forwardRef(({ text, own }, ref) => {
  return (
    <Flex
      ref={ref}
      w='100%'
      justifyContent={own && 'flex-end'}
      alignItems='start'
      mb='20px'>
      {!own && <Avatar w='40px' h='40px' mr='5px' />}
      <Box
        maxWidth='500px'
        borderRadius='10px'
        bg='#5E6BF8'
        color='white'
        padding='10px'>
        {text}
      </Box>
      {own && <Avatar w='40px' h='40px' ml='5px' />}
    </Flex>
  );
});
Message.displayName = 'Message';

export default Message;
