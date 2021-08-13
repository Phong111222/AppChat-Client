import { Box, Center, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import CustomAvatar from './CustomAvatar';
import { HiDotsHorizontal } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { Fade } from '../../utils/variants';
const Boxmotion = motion(Box);
export default function FriendItem({ active, name, isOnline }) {
  const [showDot, setShowDot] = useState(false);
  return (
    <Flex
      _hover={
        !active && {
          background: 'rgba(206, 206, 206,0.3)',
        }
      }
      onMouseEnter={() => setShowDot(true)}
      onMouseLeave={() => setShowDot(false)}
      cursor='pointer'
      background={active && 'rgba(90, 95, 255,0.7)'}
      h='10%'
      overflow='hidden'
      justifyContent='space-between'
      alignItems='center'
      px='10px'
      position='relative'>
      <Boxmotion
        variants={Fade}
        initial='hidden'
        animate={showDot ? 'visible' : 'hidden'}
        position='absolute'
        transition={{
          duration: 0.8,
          type: 'spring',
        }}
        top='0'
        right='2'>
        <HiDotsHorizontal color='gray.800' />
      </Boxmotion>

      <Flex alignItems='center'>
        <CustomAvatar
          isOnline={isOnline}
          w='60px'
          h='60px'
          src='https://i1.sndcdn.com/avatars-000214125831-5q6tdw-t500x500.jpg'
        />
      </Flex>
      <Box w='75%'>
        <Text
          mb='0'
          lineHeight='1'
          textOverflow='ellipsis'
          fontSize='18px'
          mb='10px'
          color={active && 'white'}>
          {name}
        </Text>
      </Box>
    </Flex>
  );
}
