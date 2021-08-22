import {
  Box,
  Avatar,
  Button,
  Center,
  Heading,
  Text,
  Flex,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { baseURL } from '../../utils/constant';

export default function Profile({ handleChangePassword }) {
  const { info } = useSelector((state) => state.user);
  return (
    <Box>
      <Center>
        <Avatar
          boxShadow='rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
          src={`${baseURL}/upload/${info?.avatar}`}
          size='xl'
        />
      </Center>
      <Center flexDirection='column'>
        <Heading as='h6'>{info.name}</Heading>
        <Text>{info.email}</Text>
      </Center>
      <Center mt='40px'>
        <Button onClick={handleChangePassword}>Change password</Button>
      </Center>
    </Box>
  );
}
