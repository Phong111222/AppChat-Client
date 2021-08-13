import { Box, SimpleGrid } from '@chakra-ui/layout';
import { Avatar, Flex, Text, Center } from '@chakra-ui/react';
import FriendCard from '../../common/FriendCard';
import { BiUserPlus } from 'react-icons/bi';
const Friend = () => {
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
      <Center h='88vh' padding='30px' boxSizing='border-box'>
        <SimpleGrid w='100%' columns={{ sm: 2, md: 3, lg: 4 }} spacing='30px'>
          <FriendCard />
          <FriendCard />
          <FriendCard />
          <FriendCard />
          <FriendCard />
          <FriendCard />
          <FriendCard />
        </SimpleGrid>
      </Center>
    </Box>
  );
};

export default Friend;
