import { Box, Modal } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const ModalCreateGroup = ({ isShow, onShow, onClose, selectedList = [] }) => {
  const { listFriends } = useSelector((state) => state.friend);

  const [list, setList] = useState(() => {
    if (selectedList.length) {
      return listFriends.map((friend) => ({ ...friend, select: true }));
    }
    const checkedUsers = selectedList.map((user) => user._id);
    return listFriends.map((friend) =>
      checkedUsers.includes(friend._id)
        ? { ...friend, selected: true }
        : { ...friend, selected: false }
    );
  });

  return null;
};

export default ModalCreateGroup;
