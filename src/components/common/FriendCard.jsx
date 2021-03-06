import { Center, Avatar, Text, Button, Box } from '@chakra-ui/react';
import { useState } from 'react';
import { VscClose } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { DeleteOneFriendSuggestion } from '../../store/Friend/action';
const FriendCard = ({
  w = '100%',
  h = '250px',
  imgSrc,
  onSendFriendRequest,
  user,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { name, email, _id: userId } = user;
  const handleClick = () => {
    // setLoading(!loading);
    onSendFriendRequest(userId);
    dispatch(DeleteOneFriendSuggestion(userId));
  };
  const handleClose = () => {
    dispatch(DeleteOneFriendSuggestion(userId));
  };
  return (
    <Center
      boxSizing='border-box'
      position='relative'
      boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'
      flexDirection='column'
      w={w}
      h={h}
      p='10px'
      background='white'
      borderRadius='8px'>
      <Box
        position='absolute'
        display='inline-block'
        top='2'
        right='3'
        cursor='pointer'
        onClick={handleClose}>
        <VscClose color='#A0AEC0' />
      </Box>
      <Center>
        <Avatar size='lg' src={imgSrc} />
      </Center>
      <Center flexDirection='column'>
        <Text fontWeight='bold'>{name || 'Phong'}</Text>
        <Text fontSize='14px' color='gray.500'>
          {email || 'tienphong@gmail.com'}
        </Text>
      </Center>
      <Center mt='25px' w='50%'>
        <Button
          onClick={handleClick}
          w='100%'
          _hover={{ opacity: 0.8 }}
          _disabled={{ opacity: 0.8, cursor: 'not-allowed' }}
          _active={{ opacity: 0.7 }}
          _focus={{ outline: 'none' }}
          background='#647dee'
          color='white'
          fontSize='15px'
          boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
          isLoading={loading}>
          + Add Friend
        </Button>
      </Center>
    </Center>
  );
};

export default FriendCard;
