import { Flex } from '@chakra-ui/react';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { SetOnline } from '../../../store/Room/action';
import { useEffect } from 'react';
const socket = io('http://localhost:5000');
export default function ChatLayout({ children, pathName }) {
  const { info } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathName !== '/' || '/register') {
      socket.emit('send-online', info?._id);
      socket.on('online', (userId) => {
        dispatch(SetOnline(userId));
      });
    }
  }, [pathName]);

  useEffect(() => {
    return () => {
      socket.offAny(['online', 'send-online']);
    };
  });
  return (
    <Flex w='100vw'>
      <Sidebar />
      <>{children}</>
    </Flex>
  );
}
