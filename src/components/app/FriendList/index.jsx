import { Box, Flex, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetListFriendRequests,
  GetListFriends,
} from '../../../store/Friend/action';
import { getToken } from '../../../utils/getToken';
import FriendItem from '../../common/FriendItem';
import { GrDown, GrUp } from 'react-icons/gr';
import FriendRequestItem from '../../common/FriendRequestItem';
import React from 'react';
import SocketContext from '../../../Context/SocketContext';
const FriendList = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  useEffect(() => {
    dispatch(GetListFriends(getToken()));
    dispatch(GetListFriendRequests());
  }, []);
  const { listFriends, listFriendRequests } = useSelector(
    (state) => state.friend
  );
  const [showListFriends, setShowListFriends] = useState(true);
  const [showListRequest, setShowListRequest] = useState(true);
  const handleShowListFriends = () => setShowListFriends(!showListFriends);
  const handleShowListRequest = () => setShowListRequest(!showListRequest);
  return (
    <>
      <Flex
        justifyContent='space-between'
        alignItems='center'
        w='90%'
        margin='0 auto'
        mb='15px'>
        <Box>
          <Text>Request</Text>
        </Box>
        <Box cursor='pointer' onClick={handleShowListRequest}>
          {!showListRequest ? (
            <GrUp fontSize='12px' />
          ) : (
            <GrDown fontSize='12px' />
          )}
        </Box>
      </Flex>
      {(listFriendRequests.length || null) && (
        <>
          {showListRequest && (
            <>
              {listFriendRequests?.map((request, index) => (
                <FriendRequestItem
                  socket={socket}
                  name={request?.name}
                  userId={request?._id}
                  key={index}
                />
              ))}
            </>
          )}
        </>
      )}
      <Flex
        // justifyContent='center'
        justifyContent='space-between'
        alignItems='center'
        w='90%'
        margin='0 auto'
        borderTop='1px solid #e1e4ea'
        pt='10px'>
        <Box>
          <Text>Friend</Text>
        </Box>
        <Box cursor='pointer' onClick={handleShowListFriends}>
          {!showListFriends ? (
            <GrUp fontSize='12px' />
          ) : (
            <GrDown fontSize='12px' />
          )}
        </Box>
      </Flex>

      {showListFriends && (
        <>
          {listFriends?.map((friend, index) => (
            <FriendItem user={friend} key={index} isOnline={friend?.isOnline} />
          ))}
        </>
      )}
    </>
  );
};

export default FriendList;
