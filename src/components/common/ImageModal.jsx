import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { CloseImageModal } from '../../store/User/action';
import { baseURL } from '../../utils/constant';

const ImageModal = () => {
  const { selectedImage, isImageModalOpen } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(CloseImageModal());
  };

  return (
    <Modal isOpen={isImageModalOpen} size='4xl' onClose={onClose}>
      <ModalContent h='80vh'>
        <ModalCloseButton />

        <ModalBody>
          <Center h='100%'>
            <Image
              h='500px'
              src={`${baseURL}/upload/${selectedImage}`}
              loading='lazy'
            />
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;
