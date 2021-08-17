import { Box, Center, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import CustomAvatar from './CustomAvatar';
import { HiDotsHorizontal } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { Fade } from '../../utils/variants';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  AddNewRoom,
  GetRoomListMessage,
  SelectRoom,
} from '../../store/Room/action';
import AxiosConfig from '../../utils/constant';
import { Room } from '../../utils/endpoints';
import { getToken } from '../../utils/getToken';
const Boxmotion = motion(Box);
export default function FriendItem({ active, isOnline, user }) {
  const [showDot, setShowDot] = useState(false);
  const { name, _id: userId } = user;
  const router = useRouter();
  const dispatch = useDispatch();
  const { rooms, selectedRoom } = useSelector((state) => state.room);
  const { info: loggedUser } = useSelector((state) => state.user);
  const handleClick = async () => {
    const usersInSelectedRoom = selectedRoom?.users.map((user) => user._id);
    if (
      usersInSelectedRoom?.includes(loggedUser._id) &&
      usersInSelectedRoom?.includes(userId) &&
      selectedRoom
    ) {
      router.push(`/app/${selectedRoom._id}`);
    } else {
      const newRooms = [...rooms];
      const index = rooms.findIndex((room) => room._id === selectedRoom?._id);
      if (index !== -1) newRooms.splice(index, 1);
      let checkRoom = null;
      for (const room of newRooms) {
        const users = room.users.map((user) => user._id);

        if (users.includes(loggedUser._id) && users.includes(userId)) {
          checkRoom = room;
          break;
        }
      }
      if (checkRoom) {
        dispatch(SelectRoom(checkRoom._id));
        dispatch(GetRoomListMessage(checkRoom._id));
        router.push(`/app/${checkRoom._id}`);
      } else {
        try {
          const {
            data: {
              message: { newRoom },
            },
          } = await AxiosConfig.post(
            Room.CREATE_SINGLE_ROOM,
            {
              userId1: loggedUser._id,
              userId2: userId,
              roomType: 'Single',
            },
            {
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            }
          );
          dispatch(AddNewRoom(newRoom._id));
          dispatch(SelectRoom(newRoom._id));

          router.push(newRoom._id);
        } catch (error) {
          throw new Error(error.toString());
        }
      }
    }
  };

  return (
    <Flex
      onClick={handleClick}
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
          lineHeight='1'
          textOverflow='ellipsis'
          fontSize='18px'
          mb='0px'
          color={active && 'white'}>
          {name}
        </Text>
      </Box>
    </Flex>
  );
}
