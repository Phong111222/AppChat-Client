import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Flex, useToast, Image, Center } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CgImage } from 'react-icons/cg';
import { GrClose } from 'react-icons/gr';
import CustomIcon from './CustomIcon';
import { v4 as uuidv4 } from 'uuid';
import { GoPlus } from 'react-icons/go';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const ShowListImages = ({ listImage, onDelete, onAdd }) => {
  const handleDelete = (e, imgId) => {
    e.stopPropagation();
    onDelete(imgId);
  };
  return (
    <>
      {listImage?.length > 0 ? (
        <Flex
          onClick={(e) => e.stopPropagation()}
          boxSizing='border-box'
          borderRadius='8px'
          flexDirection='row'
          flexWrap='wrap'
          alignItems='end'
          paddingBottom='0'
          top='-350%'
          left='0'
          position='absolute'
          w='500px'
          height='150px'
          background='white'
          overflowX='scroll'
          boxShadow='rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
          zIndex={1}
          css={{
            '&::-webkit-scrollbar': {
              width: '5px',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#cecece',
              borderRadius: '24px',
            },
          }}>
          {listImage.map((img, index) => (
            <React.Fragment key={index}>
              <Center
                mt='25px'
                w='120px'
                padding='10px'
                h='80%'
                position='relative'
                onClick={(e) => e.stopPropagation()}>
                <Center
                  onClick={(e) => handleDelete(e, img.id)}
                  boxShadow='rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                  position='absolute'
                  zIndex={99}
                  background='rgba(206, 206, 206,0.8)'
                  transition='ease 1s'
                  _hover={{
                    background: ' #A0AEC0',
                  }}
                  w='25px'
                  h='25px'
                  borderRadius='50%'>
                  <GrClose size={10} fontWeight='bold' />
                </Center>
                <Image w='100%' src={img.url} />
              </Center>
            </React.Fragment>
          ))}
          <Center
            onClick={onAdd}
            mt='25px'
            w='120px'
            padding='10px'
            h='80%'
            position='relative'>
            <Center
              boxShadow='rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
              position='absolute'
              zIndex={999}
              background='rgba(206, 206, 206,0.8)'
              transition='ease 1s'
              _hover={{
                background: ' #A0AEC0',
              }}
              w='90%'
              h='90%'>
              <GoPlus size={30} fontWeight='bold' />
            </Center>
          </Center>
        </Flex>
      ) : null}
    </>
  );
};

const Upload = ({
  w,
  h,
  name,

  isMultiple = false,
  icon,
  limit,
  fileType,
  fileSize = 2 * 1024 * 1024,
}) => {
  const fileRef = useRef();
  const {
    setValue,
    formState: { isSubmitted, submitCount },
  } = useFormContext();
  const toast = useToast();
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [renderImgs, setRenderImgs] = useState([]);
  useEffect(() => {
    setValue(name, []);
  }, []);
  useEffect(() => {
    setFile(null);
    setFileList([]);
    setRenderImgs([]);
  }, [submitCount]);
  useEffect(() => {
    (async function () {
      const newfiles = [];
      for (const file of fileList) {
        const url = await getBase64(file);
        newfiles.push({
          file,
          url,
          id: uuidv4(),
        });
      }
      fileList.length <= limit
        ? (function () {
            setValue(name, newfiles);
            setRenderImgs(newfiles);
          })()
        : (function () {
            toast({
              status: 'error',
              duration: 2000,
              description: `Reached limit of files.
                        ${limit} ${limit > 1 ? 'files' : 'file'} is permitted `,
            });
            setFileList([]);
            setValue(name, []);
          })();
    })();
  }, [file]);

  const handleUpload = async (data) => {
    if (data.target.files[data.target.files.length - 1].size > fileSize) {
      toast({
        status: 'error',
        duration: 2000,
        description: "Reached limit of file's size",
      });
      return;
    }
    const files = [...data.target.files];

    setFile((prev) => {
      const newFile = files[files.length - 1];
      return { ...prev, newFile };
    });
    setFileList([...fileList, ...files]);
  };

  const onDelete = (imageId) => {
    const newRender = renderImgs.filter((img) => img.id !== imageId);
    setRenderImgs(newRender);
    setFileList(newRender);
    setValue('images', newRender);
  };

  return (
    <>
      <Input
        accept={fileType || '*/*'}
        multiple={isMultiple}
        onChange={async (e) => {
          await handleUpload(e);
          e.target.value = '';
        }}
        ref={fileRef}
        name={name}
        style={{ display: 'none' }}
        type='file'
      />
      <Button
        position='relative'
        w={w}
        h={h}
        onClick={() => {
          fileRef.current.click();
          fileRef.current.value = null;
        }}
        background='none'
        _hover={{ background: 'none' }}
        _focus={{ outline: 'none' }}
        transition='ease 0.5s'>
        {icon || (
          <CustomIcon h='100%' icon={<CgImage color='grey' size='25px' />} />
        )}
        {setRenderImgs.length > 0 && (
          <ShowListImages
            listImage={renderImgs}
            onDelete={onDelete}
            onAdd={() => {
              fileRef.current.click();
              fileRef.current.value = null;
            }}
          />
        )}
      </Button>
    </>
  );
};

export default Upload;
