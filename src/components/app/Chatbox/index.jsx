import {
  Box,
  Text,
  Flex,
  FormControl,
  Input,
  Center,
  Textarea,
  InputGroup,
} from '@chakra-ui/react';
import { useForm, useFormContext, FormProvider } from 'react-hook-form';
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
  AddMessageByRoomId,
  GetRoomListMessage,
  SelectRoom,
} from '../../../store/Room/action';
import { io } from 'socket.io-client';
import AxiosConfig, { secret } from '../../../utils/constant';
import { Room } from '../../../utils/endpoints';
import { getToken } from '../../../utils/getToken';
import Loading from '../../common/Loading';
import { DecryptMessage, EncryptMessage } from '../../../utils/func';
import Upload from '../../common/Upload';
import Form from '../../common/Form';
import FormInput from '../../common/FormInput';
const socket = io('http://localhost:5000');
export default function Chatbox() {
  const dispatch = useDispatch();
  const fileRef = useRef();
  const { selectedRoom, loading } = useSelector((state) => state.room);

  const { info } = useSelector((state) => state.user);
  // const { register, handleSubmit, reset, setValue } = useForm();
  const methods = useForm();
  const { register, handleSubmit, setValue } = methods;
  const scrollRef = useRef();
  const onSubmit = async (data) => {
    // if (!data?.message && !data?.images?.length && !data?.files?.length) return;
    console.log(data);
    setValue('message', null);
    setValue('images', null);
    setValue('files', null);
    // setValue('images', null);
    // const token = getToken();
    // const {
    //   data: { message },
    // } = await AxiosConfig.post(
    //   Room.CREATE_SINGLE_MESSAGE(selectedRoom?._id),
    //   {
    //     text: data.message,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    // dispatch(AddMessage(message));
    // socket.emit('send-message', message, selectedRoom._id);
    // reset(['message']);
  };

  useEffect(() => {
    dispatch(GetRoomListMessage(selectedRoom?._id));
  }, []);
  useEffect(() => {
    socket.emit('join-room', selectedRoom?._id, info?.name);
  }, []);

  useEffect(() => {
    socket.on('recieve-message', (message) => {
      if (message.room.toString() !== selectedRoom?._id.toString()) {
        dispatch(AddMessageByRoomId(message, message.room));
      } else {
        dispatch(AddMessage(message));
      }
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
                text={DecryptMessage(message?.text, selectedRoom?._id)}
              />
            ))}
            {/* <Message own={true} text='scroll' /> */}
          </Box>
        ) : (
          <Loading />
        )}
      </Flex>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex h='15vh' flexDirection='column' borderTop='1px solid #e1e4ea'>
            <Flex
              h='7vh'
              w='95%'
              margin='0 auto'
              justifyContent='flex-start'
              alignItems='center'>
              <FormControl w='5%'>
                <Upload
                  fileType={['.jpg', '.png']}
                  limit={3}
                  w='40px'
                  h='40px'
                  name='images'
                  // setValue={setValue}
                  isMultiple={true}
                />
              </FormControl>
              <FormControl w='5%'>
                <Upload
                  fileType={'application/*'}
                  w='40px'
                  h='40px'
                  name='files'
                  isMultiple={true}
                  limit={3}
                  fileSize={5 * 1024 * 1024}
                  icon={
                    <CustomIcon
                      icon={<RiFileListFill color='grey' size='25px' />}
                    />
                  }
                />
              </FormControl>
            </Flex>
            <FormControl display='block' mt='auto'>
              <Flex h='8vh'>
                <Input
                  h='100%'
                  w='90%'
                  resize='none'
                  borderRadius='none'
                  _focus={{ borderTop: '1px solid #647dee' }}
                  placeholder='Message ...'
                  {...register('message')}
                />

                <CustomButton
                  h='100%'
                  type='submit'
                  bg='#647dee'
                  borderRadius='none'
                  w='10%'
                  mt='0'>
                  <BiSend />
                </CustomButton>
              </Flex>
            </FormControl>
          </Flex>
        </form>
      </FormProvider>
    </Box>
  );
}
