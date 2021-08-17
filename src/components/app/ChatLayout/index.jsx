import { Flex, useToast } from '@chakra-ui/react';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { AddMessage, SetOffline, SetOnline } from '../../../store/Room/action';
import { useContext, useEffect } from 'react';

import {
  AddRequest,
  FriendRequestAccepted,
  SetFriendOffline,
  SetFriendOnline,
} from '../../../store/Friend/action';
import SocketContext from '../../../Context/SocketContext';

const ChatLayout = ({ children, pathName }) => {
  const { info } = useSelector((state) => state.user);
  const { listFriends } = useSelector((state) => state.friend);
  const dispatch = useDispatch();
  const toast = useToast();
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit('send-online', info?._id);
    socket.on('online', (userId) => {
      if (userId !== info?._id) {
        dispatch(SetOnline(userId));
        dispatch(SetFriendOnline(userId));
      }
    });
  }, []);

  useEffect(() => {
    socket.emit('check-online-user', listFriends, info);
    socket.on('online-users', (onlineUsers) => {
      for (const user of onlineUsers) {
        dispatch(SetOnline(user._id));
        dispatch(SetFriendOnline(user._id));
      }
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('recieve-friend-request', (requestData) => {
      const { userId, info: UserRequest } = requestData;

      if (userId === info._id) {
        toast({
          status: 'success',
          description: `${UserRequest?.name} has sent you friend request`,
          duration: 2000,
          position: 'top-right',
        });
        dispatch(AddRequest(UserRequest));
      }
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('recieve-accept', (AcceptData) => {
      const { userId, userAccepted } = AcceptData;

      if (userId === info._id.toString()) {
        toast({
          status: 'success',
          description: `${userAccepted?.name} accepted you friend request`,
          duration: 2000,
          position: 'top-right',
        });
        dispatch(FriendRequestAccepted(userAccepted));
      }
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('recieve-offline', (user) => {
      // console.log(user);
      dispatch(SetOffline(user?.userId));
      dispatch(SetFriendOffline(user?.userId));
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('recieve-message', (message) => {
      dispatch(AddMessage(message));
    });
  }, []);

  return (
    <Flex w='100vw'>
      <Sidebar />
      {children}
    </Flex>
  );
};
export default ChatLayout;
