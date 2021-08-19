import { Input, Flex, Box, Center } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { OpenMakeGroupModal } from '../../store/User/action';
export default function Searchbox({ pathname, placeholder, ...props }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

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

  const handleOpenMakeGroupModal = () => {
    dispatch(OpenMakeGroupModal());
  };

  return (
    <>
      <Flex
        boxSizing='border-box'
        justifyContent='center'
        flexDirection='column'
        alignItems='center'
        {...props}>
        <Center w='80%'>
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
          <Center
            onClick={handleOpenMakeGroupModal}
            ml='15px'
            padding='10px'
            cursor='pointer'
            borderRadius='50%'
            _hover={{
              background: '#E8EAEF',
              transition: '0.5s',
            }}>
            <AiOutlineUsergroupAdd size={20} />
          </Center>
        </Center>
      </Flex>
      <Center>
        <Box w='90%' borderTop='1px solid #e1e4ea' mb='10px' />
      </Center>
    </>
  );
}
