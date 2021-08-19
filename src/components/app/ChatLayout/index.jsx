import { Flex, useToast } from '@chakra-ui/react';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddMessage,
  GetListSingleRooms,
  SetOffline,
  SetOnline,
} from '../../../store/Room/action';
import { useContext, useEffect } from 'react';

import {
  AddRequest,
  FriendRequestAccepted,
  SetFriendOffline,
  SetFriendOnline,
} from '../../../store/Friend/action';
import SocketContext from '../../../Context/SocketContext';
import { ResetNumberOfMessages } from '../../../store/NumberOfMessages';
import ModalCreateGroup from '../../common/ModalCreateGroup';

const ChatLayout = ({ children, pathName }) => {
  const { info } = useSelector((state) => state.user);
  const { listFriends } = useSelector((state) => state.friend);
  const dispatch = useDispatch();
  const toast = useToast();
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit('send-online', info?._id);
    socket.on('online', (onlineUsers) => {
      dispatch(ResetNumberOfMessages());
      const usersOnline = onlineUsers?.map((user) => user.userId);
      for (const user of listFriends) {
        if (usersOnline.includes(user._id)) {
          dispatch(SetOnline(user._id));
          dispatch(SetFriendOnline(user._id));
        }
      }
    });
    return () => {
      socket.offAny(['send-online', 'online']);
    };
  }, []);

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
    return () => {
      socket.off('recieve-friend-request');
    };
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
    return () => {
      socket.off('recieve-accept');
    };
  }, [socket]);

  useEffect(() => {
    socket?.on('recieve-offline', (user) => {
      // console.log(user);
      dispatch(SetOffline(user?.userId));
      dispatch(SetFriendOffline(user?.userId));
    });
    return () => {
      socket.off('recieve-offline');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('recieve-message', (message) => {
      dispatch(AddMessage(message));
    });
    return () => {
      socket.off('recieve-message');
    };
  }, []);
  useEffect(() => {
    socket.on('newroom', () => {
      dispatch(GetListSingleRooms());
    });
    return () => {
      socket.off('newroom');
    };
  }, []);
  return (
    <Flex w='100vw'>
      <Sidebar />
      {children}
      <ModalCreateGroup />
    </Flex>
  );
};
export default ChatLayout;
