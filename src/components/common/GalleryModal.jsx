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
  Text,
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
  const dispatch = useDispatch();

  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  const settingCarousel = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const settingsSliderNav = {
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    focusOnSelect: true,
    infinite: false,
  };

  const onClose = () => {
    dispatch(CloseGalleryModal());
  };
  return (
    <Modal isOpen={isGalleryModalOpen} size='6xl' onClose={onClose}>
      <ModalContent boxSizing='border-box' padding='10px 15px'>
        <ModalHeader>GALLERY</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {!selectedRoom?.gallery.length ? (
            <Center height='50vh'>
              <Text>NO IMAGES</Text>
            </Center>
          ) : (
            <>
              <Box>
                <Slider
                  asNavFor={nav2}
                  ref={(c) => setNav1(c)}
                  {...settingCarousel}>
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
                  asNavFor={nav1}
                  ref={(c) => setNav2(c)}
                  {...settingsSliderNav}>
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
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GalleryModal;
