import {
  Input,
  Flex,
  Box,
  Center,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
export default function Searchbox({ pathname, placeholder, ...props }) {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const onclose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const handleChangle = useCallback(
    (e) => {
      e.preventDefault();
      setValue(e.target.value);
    },
    [value]
  );
  const handleKeyDown = (e) => {
    const key = e.key;
    if (pathname === '/friend') {
      if (key === 'Enter') {
        // if (value.trim() === '') return;
        setValue('');
        onOpen();
      }
    } else {
      return;
    }
  };

  return (
    <>
      <Flex
        boxSizing='border-box'
        justifyContent='center'
        flexDirection='column'
        alignItems='center'
        {...props}>
        <Center w='90%'>
          <Input
            value={value}
            onChange={handleChangle}
            onKeyDown={handleKeyDown}
            focusBorderColor='#647dee'
            bg='#e8eaef'
            h='40px'
            borderRadius='15px'
            placeholder={placeholder || 'Search conversation'}
            _placeholder={{ fontSize: 15 }}
          />
        </Center>
      </Flex>
      <Center>
        <Box w='90%' borderTop='1px solid #e1e4ea' mb='10px' />
      </Center>
      <Modal isOpen={isOpen} onClose={onclose}>
        <ModalContent>
          <ModalHeader>
            <h1>Hello</h1>
          </ModalHeader>

          <ModalBody>{/* <h1>Phong</h1> */}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
