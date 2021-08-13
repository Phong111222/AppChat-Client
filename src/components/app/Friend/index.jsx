import { Box, SimpleGrid } from '@chakra-ui/layout';
import { Avatar, Flex, Text, Center } from '@chakra-ui/react';
import FriendCard from '../../common/FriendCard';
import { BiUserPlus } from 'react-icons/bi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetListFriendsSuggest } from '../../../store/Friend/action';
import { useRouter } from 'next/router';
const Friend = () => {
  const { pathname } = useRouter();
  const dispatch = useDispatch();
  const { suggestList } = useSelector((state) => state.friend);
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
        <SimpleGrid w='100%' columns={{ sm: 2, md: 3, lg: 4 }} spacing='30px'>
          {suggestList?.map((user) => (
            <FriendCard
              name={user?.name}
              email={user?.email}
              key={user?._id}
              userId={user?._id}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Friend;
