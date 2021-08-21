import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Flex, useToast, Image, Center, Avatar } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CgImage } from 'react-icons/cg';
import { GrClose } from 'react-icons/gr';
import CustomIcon from './CustomIcon';
import { GoPlus } from 'react-icons/go';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const UploadAvatar = ({
  w,
  h,
  name,

  fileSize = 2 * 1024 * 1024,
}) => {
  const fileRef = useRef();
  const {
    setValue,
    formState: { isSubmitted, submitCount },
  } = useFormContext();
  const toast = useToast();
  const [file, setFile] = useState({
    file: null,
    url: '',
  });

  //   useEffect(() => {
  //     setFile({
  //       file: null,
  //       url: '',
  //     });
  //   }, [submitCount]);

  useEffect(() => {
    setValue(name, file);
  }, [file]);
  const handleUpload = async (e) => {
    if (e.target.files.length > 1) {
      toast({
        status: 'error',
        duration: 2000,
        description: 'Avatar must use one picutre',
      });
      return;
    }
    if (e.target.files[0].size > fileSize) {
      toast({
        status: 'error',
        duration: 2000,
        description: "Reached limit of file's size",
      });
      setFile(null);
      return;
    }

    const url = await getBase64(e.target.files[0]);
    setFile({
      file: e.target.files[0],
      url,
    });
  };

  //   const onDelete = (imageId) => {
  //     const newRender = renderImgs.filter((img) => img.id !== imageId);
  //     setRenderImgs(newRender);
  //     setFileList(newRender);
  //     setValue('images', newRender);
  //   };

  return (
    <>
      <Input
        accept='*.jpg,*.png'
        onChange={handleUpload}
        ref={fileRef}
        name={name}
        style={{ display: 'none' }}
        type='file'
      />
      <Center
        cursor='pointer'
        position='relative'
        w={w}
        h={h}
        onClick={(e) => {
          fileRef.current && fileRef.current.click();
        }}
        background='none'
        _hover={{ background: 'none' }}
        _focus={{ outline: 'none' }}
        transition='ease 0.5s'>
        {/* {icon || (
          <CustomIcon h='100%' icon={<CgImage color='grey' size='25px' />} />
        )} */}
        <Avatar size='xl' src={file.url} />
      </Center>
    </>
  );
};

export default UploadAvatar;
