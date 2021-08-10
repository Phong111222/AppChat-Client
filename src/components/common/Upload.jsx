import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { useRef } from 'react';
import { CgImage } from 'react-icons/cg';
import CustomIcon from './CustomIcon';
const Upload = ({ w, h, name, setValue, isMultiple = false, icon }) => {
  const handleUpload = (e) => {
    const { files } = e.target;
    setValue(name, files);
  };
  const fileRef = useRef();
  return (
    <>
      <Input
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
