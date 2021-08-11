import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { useToast } from '@chakra-ui/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CgImage } from 'react-icons/cg';
import CustomIcon from './CustomIcon';
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
  const handleUpload = (data) => {
    if (data.target.files[data.target.files.length - 1].size > fileSize) {
      toast({
        status: 'error',
        duration: 2000,
        description: "Reached limit of file's size",
      });
      return;
    }
    setFile((prev) => {
      const newFile = data.target.files[data.target.files.length - 1];
      return { ...prev, newFile };
    });
    setFileList((prev) => {
      return [...prev, ...data.target.files];
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
        onChange={handleUpload}
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
        }}
        background='none'
        _hover={{ background: 'none' }}
        _focus={{ outline: 'none' }}
        // display='inline-block'
        transition='ease 0.5s'>
        {icon || (
          <CustomIcon
            // hoverStyle={{ background: 'none' }}
            h='100%'
            icon={<CgImage color='grey' size='25px' />}
          />
        )}
      </Button>
    </>
  );
};

export default Upload;
