import { Avatar, Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { BiUserPlus } from 'react-icons/bi';
import { RiGroupLine } from 'react-icons/ri';
import CustomScrollbars from '../../common/CustomScrollbar';

const Group = () => {
  return (
    <>
      <Box w='73vw' background='gray.50'>
        <Box background='white' h='12vh' p='10px 30px'>
          <Flex alignItems='center'>
            <Avatar
              icon={<RiGroupLine color='white' fontSize='30px' />}
              size='lg'
              background='#647dee'
            />
            <Text ml='15px' fontWeight='bold' fontSize='25px'>
              GROUP
            </Text>
          </Flex>
        </Box>
        <Box h='88vh' padding='30px' boxSizing='border-box'>
          <CustomScrollbars>
            <SimpleGrid
              w='100%'
              columns={{ sm: 2, md: 3, lg: 4 }}
              spacing='30px'>
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

              {/* {suggestList?.map((user) => (
          <FriendCard
            user={user}
            key={user?._id}
            onSendFriendRequest={handleSendFriendRequest}
          />
        ))} */}
            </SimpleGrid>
          </CustomScrollbars>
        </Box>
      </Box>
    </>
  );
};

export default Group;
