import { Avatar, Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import { BiUserPlus } from 'react-icons/bi';
import { RiGroupLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import CustomScrollbars from '../../common/CustomScrollbar';
import GroupCard from '../../common/GroupCard';

const Group = () => {
  const { rooms } = useSelector((state) => state.room);
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
              {(function() {
                return rooms.filter((room) => room.roomType === 'Group');
              })().map((room) => (
                <React.Fragment key={room._id}>
                  <GroupCard room={room} />
                </React.Fragment>
              ))}
            </SimpleGrid>
          </CustomScrollbars>
        </Box>
      </Box>
    </>
  );
};

export default Group;
