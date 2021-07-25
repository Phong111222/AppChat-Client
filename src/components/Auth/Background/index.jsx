import React, { useState } from 'react';
import { Flex, Box, Heading, Image, Text } from '@chakra-ui/react';

import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
const MotionBox = motion(Box);
export default function AuthBackground({ children }) {
  const router = useRouter();

  return (
    <Flex bgGradient='linear(315deg, #7f53ac 0%, #647dee 74%)'>
      <MotionBox
        key={router.route}
        initial={{ x: '-100vw', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-100vw', opacity: 0 }}
        flex='1'
        h='100vh'
        transition={{
          duration: 0.8,
          type: 'spring',
        }}
        display='flex'
        alignItems='center'
        justifyContent='center'>
        {children}
      </MotionBox>

      <MotionBox
        initial={{ x: '100vw' }}
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
          alt='background'
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
            {router.pathname === '/register'
              ? 'Create your own account'
              : "Let's chat !"}
          </Text>
        </MotionBox>
      </MotionBox>
    </Flex>
  );
}
