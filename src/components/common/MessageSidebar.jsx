import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import CustomAvatar from './CustomAvatar';
import { HiDotsHorizontal } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { Fade } from '../../utils/variants';
import { baseURL } from '../../utils/constant';
const Boxmotion = motion(Box);
export default function MessageSidebar({
  active,
  title,
  textContent,
  sendTime,
  isOnline,
  avatarURL,
}) {
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
      h='15%'
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
        <HiDotsHorizontal color='white' />
      </Boxmotion>
      <Box position='absolute' bottom='5px' fontWeight='bold' right='2'>
        <Text
          color={active ? 'rgba(255,255,255,.8)' : 'GrayText'}
          fontSize='12px'>
          {sendTime}
        </Text>
      </Box>
      <Flex alignItems='center'>
        <CustomAvatar
          isOnline={isOnline}
          w='60px'
          h='60px'
          src={`${baseURL}/upload/${avatarURL}`}
        />
      </Flex>
      <Flex
        w='75%'
        h='40%'
        flexDirection='column'
        justifyContent='space-between'>
        <Text
          h='60%'
          overflow='hidden'
          lineHeight='1'
          textOverflow='ellipsis'
          whiteSpace='nowrap'
          fontSize='18px'
          color={active && 'white'}>
          {title}
        </Text>
        <Text
          h='40%'
          overflow='hidden'
          lineHeight='1'
          textOverflow='ellipsis'
          whiteSpace='nowrap'
          fontSize='15px'
          color={active ? 'white' : 'GrayText'}>
          {textContent}
        </Text>
      </Flex>
    </Flex>
  );
}
