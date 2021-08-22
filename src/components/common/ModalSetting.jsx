import {
  Text,
  Avatar,
  Center,
  Box,
  Modal,
  Button,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseSettingModal } from '../../store/User/action';
import ChangePassword from './ChangePassword';
import Profile from './Profile';

const ModalSetting = () => {
  const { isModalSettingOpen } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [settingItems, setSettignItems] = useState([
    {
      key: 'profile',
      title: 'Profile',
      active: false,
    },
    {
      key: 'change-password',
      title: 'Change password',
      active: false,
    },
  ]);
  const [key, setKey] = useState('');
  const onClose = () => {
    dispatch(CloseSettingModal());
  };

  const handleChangeSettingNavigate = (key) => {
    setKey(key);
    setSettignItems((prev) =>
      prev.map((item) =>
        item.key === key
          ? { ...item, active: true }
          : { ...item, active: false }
      )
    );
  };

  return (
    <Modal isOpen={isModalSettingOpen} size='3xl' onClose={onClose}>
      <ModalContent h='80vh'>
        <ModalCloseButton />

        <ModalBody paddingTop='50px' px='0'>
          <Flex boxSizing='border-box' h='100%'>
            <Box w='35%'>
              {settingItems.map((item) => (
                <Center
                  onClick={() => handleChangeSettingNavigate(item.key)}
                  key={item.key}
                  h='10%'
                  cursor='pointer'
                  transition='all 0.5s'
                  background={item.active && '#F7FAFC'}
                  _hover={{ backgroundColor: '#F7FAFC' }}>
                  <Text>{item.title}</Text>
                </Center>
              ))}
            </Box>

            <Box h='100%' w='1px' background='gray.200' />
            <Box w='65%' boxSizing='border-box' px='30px'>
              {(function() {
                switch (key) {
                  case 'profile':
                    return (
                      <Profile
                        handleChangePassword={() =>
                          handleChangeSettingNavigate('change-password')
                        }
                      />
                    );
                  case 'change-password':
                    return (
                      <>
                        <ChangePassword />
                      </>
                    );
                  default:
                    return null;
                }
              })()}
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalSetting;
