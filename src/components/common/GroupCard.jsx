import { Avatar, AvatarGroup, Box, Center, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { ResetNumberOfMessages } from '../../store/NumberOfMessages';
import { SelectRoom } from '../../store/Room/action';

const GroupCard = ({ room, w = '100%', h = 200 }) => {
  const { roomName, users, _id } = room;
  const dispatch = useDispatch();
  const router = useRouter();
  const onclick = () => {
    dispatch(ResetNumberOfMessages());
    dispatch(SelectRoom(_id));
    router.push(`/app/${_id}`);
  };
  return (
    <Flex
      onClick={onclick}
      cursor='pointer'
      boxSizing='border-box'
      boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'
      flexDirection='column'
      justifyContent='center'
      w={w}
      h={h}
      p='10px'
      background='white'
      borderRadius='8px'>
      <Center>
        <AvatarGroup max='3'>
          {users.map((user) => (
            <Avatar key={user._id} name={user.name} />
          ))}
        </AvatarGroup>
      </Center>

      <Box
        w='70%'
        mt='20px'
        mx='auto'
        overflow='hidden'
        fontWeight='bold'
        lineHeight='1'
        textOverflow='ellipsis'
        whiteSpace='nowrap'>
        {roomName}
      </Box>
    </Flex>
  );
};

export default GroupCard;
