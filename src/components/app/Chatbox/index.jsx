import {
  Box,
  Text,
  Flex,
  FormControl,
  Input,
  Center,
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { BiSend } from 'react-icons/bi';
import CustomButton from '../../common/CustomButton';
import { CgImage } from 'react-icons/cg';
import { RiFileListFill } from 'react-icons/ri';
import { BsThreeDotsVertical } from 'react-icons/bs';
import CustomIcon from '../../common/CustomIcon';
import Message from '../../common/Message';
import CustomAvatar from '../../common/CustomAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
  AddMessage,
  GetRoomListMessage,
  SelectRoom,
} from '../../../store/Room/action';
import { io } from 'socket.io-client';
import AxiosConfig from '../../../utils/constant';
import { Room } from '../../../utils/endpoints';
import { getToken } from '../../../utils/getToken';
import Loading from '../../common/Loading';

const socket = io('http://localhost:5000');
export default function Chatbox() {
  const dispatch = useDispatch();
  const { selectedRoom, loading } = useSelector((state) => state.room);

  const { info } = useSelector((state) => state.user);
  const { register, handleSubmit, reset } = useForm();
  const scrollRef = useRef();
  const onSubmit = async (data) => {
    const token = getToken();
    const {
      data: { message },
    } = await AxiosConfig.post(
      Room.CREATE_SINGLE_MESSAGE(selectedRoom?._id),
      {
        text: data.message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(AddMessage(message));
    socket.emit('send-message', message, selectedRoom._id);
    reset(['message']);
  };

  useEffect(() => {
    dispatch(GetRoomListMessage(selectedRoom?._id));
    socket.emit('join-room', selectedRoom?._id, info?.name);
    socket.on('recieve-message', (message) => {
      dispatch(AddMessage(message));
    });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  });

  return (
    <Box w='73vw'>
      <Flex
        h='10vh'
        border='1px solid #e1e4ea'
        px='15px'
        alignItems='center'
        justifyContent='space-between'>
        <Center>
          <CustomAvatar
            isOnline={selectedRoom?.onlineUser}
            w='50px'
            h='50px'
            src='https://i1.sndcdn.com/avatars-000214125831-5q6tdw-t500x500.jpg'
          />
          <Box ml='15px'>
            <Text fontWeight='extrabold' fontSize='18px'>
              {selectedRoom?.roomName}
            </Text>
            <Text color='GrayText' fontSize='12px' fontWeight='bold'>
              4 hours ago
            </Text>
          </Box>
        </Center>
        <Center
          cursor='pointer'
          w='30px'
          h='30px'
          borderRadius='50%'
          _hover={{
            background: '#E8EAEF',

            transition: '0.5s',
          }}>
          <BsThreeDotsVertical size={20} />
        </Center>
      </Flex>
      <Flex
        flexDirection='column'
        justifyContent='flex-end'
        h='75vh'
        bg='gray.50'
        px='10px'
        py='20px'
        position='relative'>
        {!loading ? (
          <Box
            w='100%'
            overflowY='scroll'
            css={{
              '&::-webkit-scrollbar': {
                width: '5px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#cecece',
                borderRadius: '24px',
              },
            }}>
            {selectedRoom?.messages?.map((message, index) => (
              <Message
                ref={scrollRef}
                key={index}
                // change to compare id in the future
                own={info?.name === message?.sender.name}
                text={message?.text}
              />
            ))}
            {/* <Message own={true} text='scroll' /> */}
          </Box>
        ) : (
          <Loading />
        )}
      </Flex>
      <Flex h='15vh' flexDirection='column' borderTop='1px solid #e1e4ea'>
        <Flex w='95%' mx='auto' h='8vh'>
          <CustomIcon icon={<CgImage color='grey' size='25px' />} />
          <CustomIcon icon={<RiFileListFill color='grey' size='25px' />} />
        </Flex>
        <Flex alignItems='center'>
          <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
            <FormControl display='flex' alignItems='center'>
              <Input
                minH='7vh !important'
                resize='none'
                borderRadius='none'
                _focus={{ borderTop: '1px solid #647dee' }}
                placeholder='Message ...'
                {...register('message')}
              />

              <CustomButton
                type='submit'
                bg='#647dee'
                borderRadius='none'
                h='7vh'
                w='10%'
                mt='0'>
                <BiSend />
              </CustomButton>
            </FormControl>
          </form>
        </Flex>
      </Flex>
    </Box>
  );
}
