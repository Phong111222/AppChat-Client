import { Flex, Box } from '@chakra-ui/react';
import Sidebar from '../app/Sidebar';
import WrappedAuth from '../Auth/WrappedAuth';

export default function Main() {
  return (
    <WrappedAuth>
      <Flex>
        <Box>
          <Sidebar />
        </Box>
      </Flex>
    </WrappedAuth>
  );
}
