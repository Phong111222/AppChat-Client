import { Center } from '@chakra-ui/react';

export default function CustomIcon({ icon }) {
  return (
    <Center
      height='80%'
      my='auto'
      px='10px'
      cursor='pointer'
      _hover={{
        background: 'rgba(206, 206, 206,0.7)',
        transition: '0.5s',
      }}
      borderRadius='12px'>
      {icon}
    </Center>
  );
}
