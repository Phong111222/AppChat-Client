import { Flex, useToast } from '@chakra-ui/react';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { SetOffline, SetOnline } from '../../../store/Room/action';
import { useEffect } from 'react';
import { ServiceTypes } from '../../../store/service/type';
import {
  AddRequest,
  FriendRequestAccepted,
  SetFriendOffline,
  SetFriendOnline,
} from '../../../store/Friend/action';

const ChatLayout = ({ children, pathName }) => {
  const { info } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.service);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch({
      type: ServiceTypes.INIT_SOCKET,
    });
  }, []);

  useEffect(() => {
    socket?.emit('send-online', info?._id);
    socket?.on('online', (userId) => {
      // if (userId !== info?._id) {
      //   dispatch(SetOnline(userId));
      //   dispatch(SetFriendOnline(userId));
      // }
      console.log(userId);
      dispatch(SetOnline(userId));
      dispatch(SetFriendOnline(userId));
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
      dispatch(SetOffline(user?._id));
      dispatch(SetFriendOffline(user?._id));
    });
  }, [socket]);

  return (
    <Flex w='100vw'>
      <Sidebar />
      {children}
    </Flex>
  );
};
export default ChatLayout;
