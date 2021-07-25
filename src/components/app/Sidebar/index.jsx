import React, { useState } from 'react';
import { Text, Box, Center, Flex } from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';
import { RiMessage2Line } from 'react-icons/ri';
import { TiContacts } from 'react-icons/ti';
import { BsBellFill } from 'react-icons/bs';
import IconSidebar from '../../common/IconSidebar';
import Searchbox from '../../common/Searchbox';
import CustomAvatar from '../../common/CustomAvatar';
import MessageSidebar from '../../common/MessageSidebar';
import CustomScrollbars from '../../common/CustomScrollbar';
const Items = [
  {
    key: 'message',
    icon: RiMessage2Line,
  },
  {
    key: 'contact',
    icon: TiContacts,
  },
  {
    key: 'notification',
    icon: BsBellFill,
  },
];
export default function Sidebar() {
  const [sidebarItems, setSidebarItems] = useState(() =>
    Items.map((ele) => ({ ...ele, active: false }))
  );
  const [settingBtn, setSettingBtn] = useState(false);
  const handleClickSettingBtn = () => {
    setSettingBtn(!settingBtn);
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
              <React.Fragment key={item.key}>
                <IconSidebar
                  onClick={() => handleActiveSidebarItems(item.key)}
                  py='20px'
                  active={item.active}
                  icon={<item.icon size='25px' color='white' />}
                />
              </React.Fragment>
            );
          })}
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
        <Searchbox h='15%' />
        <CustomScrollbars>
          <MessageSidebar active={true} />
          <MessageSidebar active={false} />
        </CustomScrollbars>
      </Box>
    </Flex>
  );
}
