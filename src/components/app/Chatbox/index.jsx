import { Box, Text, Flex, FormControl, Input, Center } from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import { BiSend } from 'react-icons/bi';
import CustomButton from '../../common/CustomButton';
import { RiFileListFill } from 'react-icons/ri';
import { GrGallery } from 'react-icons/gr';
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from 'react-icons/ai';
import CustomIcon from '../../common/CustomIcon';
import Message from '../../common/Message';
import CustomAvatar from '../../common/CustomAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  AddMessage,
  // AddMessage,
  GetMoreMessage,
  GetRoomListMessage,
} from '../../../store/Room/action';
// import { io } from 'socket.io-client';
import AxiosConfig, { baseURL } from '../../../utils/constant';
import { Room } from '../../../utils/endpoints';
import { getToken } from '../../../utils/getToken';
import Loading from '../../common/Loading';
import { DecryptMessage } from '../../../utils/func';
import Upload from '../../common/Upload';
import { useRouter } from 'next/router';
import SocketContext from '../../../Context/SocketContext';
import {
  ResetNumberOfMessages,
  SetNumberOfMessages,
  SetPermissionToGetMore,
} from '../../../store/NumberOfMessages';
import {
  OpenAddUsersModal,
  OpenGalleryModal,
  OpenMakeGroupModal,
} from '../../../store/User/action';

export default function Chatbox() {
  const router = useRouter();

  const dispatch = useDispatch();

  const { NumberOfMessages, permission } = useSelector(
    (state) => state.numberofmessages
  );

  const socket = useContext(SocketContext);
  const { selectedRoom, loading } = useSelector((state) => state.room);
  const { info } = useSelector((state) => state.user);

  const methods = useForm();
  const { register, handleSubmit, setValue } = methods;
  const scrollRef = useRef();

  const handleOpenMakeGroupModal = () => {
    dispatch(OpenMakeGroupModal());
  };

  const onSubmit = async (data) => {
    try {
      if (!data?.message.length && !data?.images?.length) return;
      console.log(data);
      const files = data.images.map((img) => img.file);
      const formData = new FormData();
      for (const file of files) {
        formData.append('image', file);
      }
      formData.append('text', data.message);
      const {
        data: {
          message: { newMessage },
        },
      } = await AxiosConfig.post(
        Room.CREATE_SINGLE_MESSAGE(selectedRoom?._id),
        formData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      dispatch(AddMessage(newMessage));
      socket.emit('send-message', newMessage, selectedRoom._id);
      setValue('message', '');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket?.emit('join-room', selectedRoom?._id, info?.name);
    return () => {
      return socket.off('join-room');
    };
  }, [router.asPath]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [selectedRoom?.messages]);

  useEffect(() => {
    if (socket.disconnected) {
      dispatch(ResetNumberOfMessages());
    }
  }, []);

  useEffect(() => {
    const GetFirstMessage = async () => {
      await dispatch(GetRoomListMessage(selectedRoom?._id));
      dispatch(SetNumberOfMessages(8));
    };
    GetFirstMessage();
  }, [router.asPath]);

  const handleScrollMoreMessage = (e) => {
    const postion = e.target.scrollTop;
    if (postion === 0) {
      if (permission) {
        AxiosConfig.get(
          Room.SINGLE_ROOM_MESSAGES(selectedRoom?._id, NumberOfMessages),
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        )
          .then((res) => {
            const { data } = res;
            if (data.message.messages.length === 0) {
              dispatch(SetPermissionToGetMore());
            } else {
              dispatch(GetMoreMessage(data.message.messages));
              dispatch(SetNumberOfMessages(8));
            }
          })
          .catch((error) => {});
      }
    }
  };
  const handleOpenGallery = () => {
    dispatch(OpenGalleryModal());
  };

  const handleOpenAddUserIntoGroupModal = () => {
    dispatch(OpenAddUsersModal());
  };
  return (
    <>
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
              src={`${baseURL}/upload/${selectedRoom?.avatar}`}
            />
            <Box ml='15px'>
              <Text fontWeight='extrabold' fontSize='18px'>
                {selectedRoom?.roomName}
              </Text>
              <Text color='GrayText' fontSize='12px' fontWeight='bold'>
                {selectedRoom?.onlineUser &&
                selectedRoom.onlineUser?.trim() !== ''
                  ? 'online'
                  : 'offline'}
              </Text>
            </Box>
          </Center>
          <Flex mr='15px'>
            {selectedRoom?.roomType === 'Single' ? (
              <Center
                onClick={handleOpenMakeGroupModal}
                cursor='pointer'
                w='35px'
                h='35px'
                mr='15px'
                borderRadius='50%'
                _hover={{
                  background: '#E8EAEF',
                  transition: '0.5s',
                }}>
                <AiOutlineUsergroupAdd size={25} />
              </Center>
            ) : (
              <Center
                onClick={handleOpenAddUserIntoGroupModal}
                cursor='pointer'
                w='35px'
                h='35px'
                mr='15px'
                borderRadius='50%'
                _hover={{
                  background: '#E8EAEF',
                  transition: '0.5s',
                }}>
                <AiOutlineUserAdd size={25} />
              </Center>
            )}

            <Center
              onClick={handleOpenGallery}
              cursor='pointer'
              w='35px'
              h='35px'
              borderRadius='50%'
              _hover={{
                background: '#E8EAEF',
                transition: '0.5s',
              }}>
              <GrGallery size={25} />
            </Center>
          </Flex>
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
              onScroll={handleScrollMoreMessage}
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
                  images={message.images}
                  own={info?.name === message?.sender.name}
                  text={DecryptMessage(message?.text, selectedRoom?._id)}
                />
              ))}
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
                    limit={10}
                    w='40px'
                    h='40px'
                    name='images'
                    // setValue={setValue}
                    isMultiple={true}
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
    </>
  );
}
