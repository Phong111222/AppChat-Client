import { Flex } from '@chakra-ui/react';
import Sidebar from '../Sidebar';

import { useRouter } from 'next/router';

export default function ChatLayout({ children }) {
  return (
    <Flex w='100vw'>
      <Sidebar />
      <>{children}</>
    </Flex>
  );
}
