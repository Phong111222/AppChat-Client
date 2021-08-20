import {
  Box,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Image,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { CloseGalleryModal } from '../../store/User/action';
import { baseURL } from '../../utils/constant';

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div onClick={onClick}>
      <GrNext />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div onClick={onClick}>
      <GrPrevious />
    </div>
  );
};
const GalleryModal = () => {
  const { selectedRoom } = useSelector((state) => state.room);
  const { isGalleryModalOpen } = useSelector((state) => state.user);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const dispatch = useDispatch();
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  useEffect(() => {
    setNav1(slider2.current);
    setNav2(slider1.current);
  }, [nav2, nav1]);

  const onClose = () => {
    dispatch(CloseGalleryModal());
  };
  return (
    <Modal isOpen={isGalleryModalOpen} size='6xl' onClose={onClose}>
      <ModalContent boxSizing='border-box' padding='10px 15px'>
        <ModalHeader>GALLERY</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Box>
            <Slider
              asNavFor={slider2.current}
              ref={slider1}
              nextArrow={<NextArrow />}
              prevArrow={<PrevArrow />}>
              {selectedRoom?.gallery.map((image) => (
                <Center key={image}>
                  <Image
                    margin='0 auto'
                    w='auto'
                    h='300px'
                    cursor='pointer'
                    src={`${baseURL}/upload/${image}`}
                    alt={image}
                    loading='lazy'
                  />
                </Center>
              ))}
            </Slider>
          </Box>
          <Box mt='10px'>
            <Slider
              nextArrow={<NextArrow />}
              prevArrow={<PrevArrow />}
              asNavFor={slider1.current}
              ref={slider2}
              slidesToShow={5}
              swipeToSlide={true}
              focusOnSelect={true}>
              {selectedRoom?.gallery.map((image) => (
                <Center key={image}>
                  <Image
                    w='auto'
                    h='100px'
                    margin='0 auto'
                    cursor='pointer'
                    src={`${baseURL}/upload/${image}`}
                    alt={image}
                    loading='lazy'
                  />
                </Center>
              ))}
            </Slider>
          </Box>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GalleryModal;
