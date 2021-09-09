import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetListSingleRooms } from '../../store/Room/action';
import { CloseMakeGroupModal } from '../../store/User/action';
import AxiosConfig from '../../utils/constant';
import { Room } from '../../utils/endpoints';
import { getToken } from '../../utils/getToken';
import CustomScrollbars from './CustomScrollbar';
import SocketContext from '../../Context/SocketContext';
const ModalCreateGroup = ({ isShow, onShow, selectedList = [] }) => {
  const socket = useContext(SocketContext);
  const { listFriends } = useSelector((state) => state.friend);
  const { isModalMakeGroupOpen } = useSelector((state) => state.user);
  const [listCheck, setListCheck] = useState([]);
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.user);
  const handleCheckValue = (values) => {
    setListCheck(values);
  };
  const onClose = () => {
    dispatch(CloseMakeGroupModal());
    setListCheck([]);
  };

  const toast = useToast();
  const handleCreate = async () => {
    const listCheckedUsers = listCheck.map((check) => JSON.parse(check)._id);
    const usersInGroup = [...[info._id], ...listCheckedUsers];
    if (usersInGroup.length < 3) {
      return toast({
        status: 'error',
        duration: 2000,
        description: `Must have at least 3 user includes you`,
        position: 'top',
      });
    }
    try {
      await AxiosConfig.post(
        Room.CREATE_GROUP_ROOM,
        {
          userList: usersInGroup,
          roomType: 'Group',
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      await dispatch(GetListSingleRooms());
      socket.emit('create-new-grouproom');
      socket.off('create-new-grouproom');
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal isOpen={isModalMakeGroupOpen} size='2xl' onClose={onClose}>
      <ModalContent h='80vh'>
        <ModalHeader>CREATE GROUP</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex justifyContent='space-between' boxSizing='border-box' h='100%'>
            <CustomScrollbars>
              <Box ml='5px'>
                <CheckboxGroup onChange={handleCheckValue}>
                  <Stack spacing='10px'>
                    {listFriends.map((friend) => (
                      <Checkbox
                        value={JSON.stringify({
                          _id: friend._id,
                          name: friend.name,
                        })}
                        key={friend._id}>
                        {friend?.name}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </Box>
            </CustomScrollbars>
            <Box h='100%' w='1px' background='gray.200' />
            <CustomScrollbars>
              <Box ml='20px'>
                <Stack spacing='10px'>
                  {listCheck.map((check, index) => {
                    const checkedUser = JSON.parse(check);

                    return <Box key={index}>{checkedUser.name}</Box>;
                  })}
                </Stack>
              </Box>
            </CustomScrollbars>
          </Flex>
        </ModalBody>
        {/* </CustomScrollbars> */}
        <ModalFooter>
          <Button onClick={handleCreate}>Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCreateGroup;
