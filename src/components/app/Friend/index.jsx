import { Box, SimpleGrid } from '@chakra-ui/layout';
import { Avatar, Flex, Text, Center } from '@chakra-ui/react';
import FriendCard from '../../common/FriendCard';
import { BiUserPlus } from 'react-icons/bi';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetListFriendsSuggest } from '../../../store/Friend/action';
import { useRouter } from 'next/router';
import AxiosConfig from '../../../utils/constant';
import { Friend as FriendEndpoints } from '../../../utils/endpoints';
import { getToken } from '../../../utils/getToken';
import CustomScrollbars from '../../common/CustomScrollbar';
import SocketContext from '../../../Context/SocketContext';
const Friend = () => {
  const { info } = useSelector((state) => state.user);
  const socket = useContext(SocketContext);
  const { pathname } = useRouter();
  const dispatch = useDispatch();
  const { suggestList } = useSelector((state) => state.friend);

  const handleSendFriendRequest = async (userId) => {
    socket.emit('send-friend-request', { userId, info });
    await AxiosConfig.post(FriendEndpoints.SEND_REQUEST(userId), null, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  };

  useEffect(() => {
    pathname === '/notification' || dispatch(GetListFriendsSuggest());
  }, []);
  return (
    <Box w='73vw' background='gray.50'>
      <Box background='white' h='12vh' p='10px 30px'>
        <Flex alignItems='center'>
          <Avatar
            icon={<BiUserPlus color='white' fontSize='30px' />}
            size='lg'
            background='#647dee'
          />
          <Text ml='15px' fontWeight='bold' fontSize='25px'>
            FRIEND SUGGESTION
          </Text>
        </Flex>
      </Box>
      <Box h='88vh' padding='30px' boxSizing='border-box'>
        <CustomScrollbars>
          <SimpleGrid w='100%' columns={{ sm: 2, md: 3, lg: 4 }} spacing='30px'>
            {/* {info?._id !== '611563d8f3b3357480a9c527' ? (
            <FriendCard
              user={{
                name: 'phong',
                email: 'tienphong111222@gmail.com',
                _id: '611563d8f3b3357480a9c527',
              }}
              onSendFriendRequest={handleSendFriendRequest}
            />
          ) : null} */}

            {suggestList?.map((user) => (
              <FriendCard
                user={user}
                key={user?._id}
                onSendFriendRequest={handleSendFriendRequest}
              />
            ))}
          </SimpleGrid>
        </CustomScrollbars>
      </Box>
    </Box>
  );
};

export default Friend;
