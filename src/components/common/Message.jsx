import { Avatar, Box, Flex, Image, SimpleGrid, Center } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { OpenImageModal, selectImage } from '../../store/User/action';
import { baseURL } from '../../utils/constant';

const Message = React.forwardRef(({ text, own, images }, ref) => {
  const dispatch = useDispatch();
  const openModalImage = (imgUrl) => {
    dispatch(selectImage(imgUrl));
    dispatch(OpenImageModal());
  };
  return (
    <Flex
      ref={ref}
      w='100%'
      justifyContent={own && 'flex-end'}
      alignItems='start'
      mb='20px'>
      {!own && <Avatar w='40px' h='40px' mr='5px' />}
      <Box
        maxWidth='500px'
        borderRadius='10px'
        bg='#5E6BF8'
        color='white'
        padding='10px'>
        <SimpleGrid
          columns={images.length}
          spacing={2}
          templateColumns={`repeat(${
            images.length < 3 ? images.length : 3
          },1fr)`}
          gap='5px'>
          {images?.length
            ? images.map((img, index) => (
                <Center key={index} borderRadius='8px' overflow='hidden'>
                  <Image
                    onClick={() => openModalImage(img)}
                    cursor='pointer'
                    src={`${baseURL}/upload/${img}`}
                    borderRadius='8px'
                    alt={img}
                    loading='lazy'
                  />
                </Center>
              ))
            : null}
        </SimpleGrid>
        {text !== '' ? text : null}
      </Box>
      {own && <Avatar w='40px' h='40px' ml='5px' />}
    </Flex>
  );
});
Message.displayName = 'Message';

export default Message;
