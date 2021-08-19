import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { useToast } from '@chakra-ui/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CgImage } from 'react-icons/cg';
import CustomIcon from './CustomIcon';

const onPreview = async (file) => {
  let src = '';
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });
  }
  return src;
};

const Upload = ({
  w,
  h,
  name,
  // setValue,
  isMultiple = false,
  icon,
  limit,
  fileType,
  fileSize = 2 * 1024 * 1024,
}) => {
  const { setValue, handleSubmit } = useFormContext();
  const toast = useToast();
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
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
      const newFile = data.target.files[data.target.files.length - 1];
      return { ...prev, newFile };
    });
    setFileList((prev) => {
      return [...prev, ...files];
    });
  };
  const fileRef = useRef();
  useEffect(() => {
    setValue(name, []);
  }, []);
  useEffect(() => {
    fileList.length <= limit
      ? setValue(name, fileList)
      : toast({
          status: 'error',
          duration: 2000,
          description: 'Reached limit of files',
        });
  }, [file]);
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
      </Button>
    </>
  );
};

export default Upload;
