import { Flex, Box } from '@chakra-ui/react';
import Sidebar from '../app/Sidebar';
import Chatbox from '../app/Chatbox';
import { useDispatch } from 'react-redux';
import WrappedAuth from '../Auth/WrappedAuth';
import { useRouter } from 'next/router';

export default function Main() {
  const { pathname } = useRouter();

  return (
    <WrappedAuth>
      <Flex>
        <Box>
          <Sidebar />
        </Box>
        <Box w='50vw'>
          <Chatbox />
        </Box>
      </Flex>
    </WrappedAuth>
  );
}
