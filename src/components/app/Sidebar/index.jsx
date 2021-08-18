import React, { useContext, useState } from 'react';
import { Box, Center, Flex } from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';
import { RiMessage2Line, RiLogoutBoxLine } from 'react-icons/ri';
import { TiContacts } from 'react-icons/ti';
import { BsBellFill } from 'react-icons/bs';
import IconSidebar from '../../common/IconSidebar';
import Searchbox from '../../common/Searchbox';
import CustomAvatar from '../../common/CustomAvatar';
import MessageSidebar from '../../common/MessageSidebar';
import CustomScrollbars from '../../common/CustomScrollbar';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../../store/Auth/action';
import Link from 'next/link';
import { GetRoomListMessage, SelectRoom } from '../../../store/Room/action';
import { format } from 'timeago.js';
import { DecryptMessage } from '../../../utils/func';
import FriendList from '../FriendList';
import SocketContext from '../../../Context/SocketContext';

const Items = [
  {
    key: 'message',
    icon: RiMessage2Line,
    link: '/app',
  },
  {
    key: 'contact',
    icon: TiContacts,
    link: '/friend',
  },
  {
    key: 'notification',
    icon: BsBellFill,
    link: '/notification',
  },
];
export default function Sidebar() {
  const { pathname } = useRouter();
  const socket = useContext(SocketContext);
  const route = useRouter();
  const dispatch = useDispatch();
  const {
    room: { rooms, selectedRoom },
  } = useSelector((state) => state);
  const { info } = useSelector((state) => state.user);
  const [sidebarItems, setSidebarItems] = useState(() =>
    Items.map((ele) => ({ ...ele, active: false }))
  );
  const [settingBtn, setSettingBtn] = useState(false);
  const handleClickSettingBtn = () => {
    setSettingBtn(!settingBtn);
  };
  const onSelectRoom = (roomId) => {
    dispatch(SelectRoom(roomId));
    dispatch(GetRoomListMessage(roomId));
  };
  const handleActiveSidebarItems = (key) => {
    setSidebarItems((prev) => {
      return prev.map((item) =>
        item.key === key
          ? { ...item, active: true }
          : { ...item, active: false }
      );
    });
  };
  const handleLogout = () => {
    socket.disconnect();
    dispatch(Logout(route, info));
  };
  return (
    <Flex
      h='100vh'
      w='27vw'
      bg='white'
      mr='0'
      borderRight='1px solid #e1e4ea'
      overflow='hidden'>
      <Flex w='18%' bg='#647dee' h='100vh' pt='15' flexDirection='column'>
        <Center cursor='pointer'>
          <CustomAvatar
            w='60px'
            h='60px'
            isOnline={true}
            src='https://i1.sndcdn.com/avatars-000214125831-5q6tdw-t500x500.jpg'
          />
        </Center>
        <Flex
          flexDirection='column'
          h='calc(100vh - 100px)'
          justifyContent='center'
          mx='5px'
          my='10px'
          bg='rgba(90, 95, 255,0.6)'
          borderRadius='20px'>
          {sidebarItems.map((item) => {
            return (
              <Link href={item.link} passHref key={item.key}>
                <a>
                  <IconSidebar
                    onClick={() => handleActiveSidebarItems(item.key)}
                    py='20px'
                    active={item.active}
                    icon={<item.icon size='25px' color='white' />}
                  />
                </a>
              </Link>
            );
          })}
          <IconSidebar
            onClick={handleLogout}
            py='20px'
            icon={<RiLogoutBoxLine size='25px' color='white' />}
          />
        </Flex>
        <IconSidebar
          onClick={handleClickSettingBtn}
          mt='auto'
          py='20px'
          active={settingBtn}
          icon={<FiSettings size='25px' color='white' />}
        />
      </Flex>
      <Box w='82%' bg=''>
        {pathname === '/friend' ? (
          <Searchbox h='15%' placeholder='Search friend' pathname={pathname} />
        ) : (
          <Searchbox h='15%' />
        )}
        {pathname === '/friend' ? (
          <CustomScrollbars>
            <FriendList />
          </CustomScrollbars>
        ) : (
          <CustomScrollbars>
            {rooms &&
              rooms.map((room) => (
                <Link key={room._id} passHref={true} href={`/app/${room._id}`}>
                  <a onClick={() => onSelectRoom(room._id)}>
                    <MessageSidebar
                      isOnline={!!room.onlineUser?.length}
                      title={room.roomName}
                      textContent={
                        !room.messages.length
                          ? ''
                          : DecryptMessage(
                              room.messages[room?.messages.length - 1]?.text,
                              room._id
                            )
                      }
                      active={room.active}
                      sendTime={format(
                        room.messages[room.messages.length - 1]?.createdAt
                      )}
                    />
                  </a>
                </Link>
              ))}
          </CustomScrollbars>
        )}
      </Box>
    </Flex>
  );
}
