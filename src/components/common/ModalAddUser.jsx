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
import {
  EditSelectedRoomName,
  GetListSingleRooms,
  SelectRoom,
} from '../../store/Room/action';
import { CloseAddUsersModal } from '../../store/User/action';
import AxiosConfig from '../../utils/constant';
import { Room } from '../../utils/endpoints';
import { getToken } from '../../utils/getToken';
import CustomScrollbars from './CustomScrollbar';
import SocketContext from '../../Context/SocketContext';
const ModalAddUsersIntoGroup = () => {
  const socket = useContext(SocketContext);
  const { listFriends } = useSelector((state) => state.friend);
  const { isModalAddUsers } = useSelector((state) => state.user);
  const { selectedRoom } = useSelector((state) => state.room);
  const [listCheck, setListCheck] = useState([]);
  const dispatch = useDispatch();

  const handleCheckValue = (values) => {
    setListCheck(values);
  };
  const onClose = () => {
    dispatch(CloseAddUsersModal());
    setListCheck([]);
  };

  const handleAdd = async () => {
    const listCheckedUsers = listCheck.map((check) => JSON.parse(check)._id);
    const users = [...listCheckedUsers];
    const listnames = listCheck.map((check) => JSON.parse(check).name);
    const listAddUsers = [];
    listFriends.forEach((friend) => {
      if (users.includes(friend._id)) {
        listAddUsers.push(friend);
      }
    });
    try {
      await AxiosConfig.patch(
        Room.ADD_USERS_INTO_GROUP(selectedRoom._id),
        {
          users,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      dispatch(GetListSingleRooms());
      dispatch(EditSelectedRoomName(listnames, listAddUsers));
      socket.emit('create-new-grouproom');
      socket.off('create-new-grouproom');
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal isOpen={isModalAddUsers} size='2xl' onClose={onClose}>
      <ModalContent h='80vh'>
        <ModalHeader>ADD USER</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex justifyContent='space-between' boxSizing='border-box' h='100%'>
            <CustomScrollbars>
              <Box ml='5px'>
                <CheckboxGroup onChange={handleCheckValue}>
                  <Stack spacing='10px'>
                    {(function() {
                      const friends = [];
                      const usersInSelectedRoom = selectedRoom?.users.map(
                        (user) => user._id
                      );
                      for (const friend of listFriends) {
                        if (!usersInSelectedRoom?.includes(friend._id)) {
                          friends.push(friend);
                        }
                      }
                      return friends;
                    })().map((friend) => (
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
          <Button onClick={handleAdd}>Add</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddUsersIntoGroup;
