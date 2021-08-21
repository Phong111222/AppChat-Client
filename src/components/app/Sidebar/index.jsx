import React, { useContext, useEffect, useState } from 'react';
import { Box, Center, Flex, Popover, PopoverTrigger } from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';
import { RiMessage2Line, RiLogoutBoxLine, RiGroupLine } from 'react-icons/ri';
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
import { ResetNumberOfMessages } from '../../../store/NumberOfMessages';

const Items = [
  {
    key: 'app',
    icon: RiMessage2Line,
    link: '/app',
  },
  {
    key: 'friend',
    icon: TiContacts,
    link: '/friend',
  },
  {
    key: 'group',
    icon: RiGroupLine,
    link: '/group',
  },
];
export default function Sidebar({ pathname }) {
  const socket = useContext(SocketContext);
  const route = useRouter();
  const dispatch = useDispatch();
  const {
    room: { rooms, selectedRoom },
  } = useSelector((state) => state);
  useEffect(() => {
    const path = pathname.split('/')[1];
    setSidebarItems((prev) =>
      prev.map((item) =>
        item.key === path
          ? { ...item, active: true }
          : { ...item, active: false }
      )
    );
    if (path === 'app') {
      if (selectedRoom) {
        route.push(`/app/${selectedRoom._id}`);
      }
    }
  }, [pathname]);

  const { info } = useSelector((state) => state.user);
  const [sidebarItems, setSidebarItems] = useState(() =>
    Items.map((ele) => ({ ...ele, active: false }))
  );
  const [settingBtn, setSettingBtn] = useState(false);
  const handleClickOpenSetting = () => {
    setSettingBtn(true);
  };
  const handleClickCloseSetting = () => {
    setSettingBtn(true);
  };
  const onSelectRoom = (roomId) => {
    dispatch(SelectRoom(roomId));
    dispatch(ResetNumberOfMessages());
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
          mt='auto'
          py='20px'
          icon={<FiSettings size='25px' color='white' />}
        />
      </Flex>
      <Box w='82%' bg=''>
        {pathname === '/friend' ? (
          <Searchbox h='15%' placeholder='Search friend' pathname={pathname} />
        ) : (
          <Searchbox h='15%' />
        )}
        {pathname === '/friend' || pathname === '/group' ? (
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
