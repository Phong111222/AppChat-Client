import { Center } from '@chakra-ui/react';

export default function CustomIcon({ w, h, icon, hoverStyle }) {
  return (
    <Center
      height={h || '80%'}
      w={w}
      my='auto'
      px='8px'
      cursor='pointer'
      _hover={
        hoverStyle || {
          background: 'rgba(206, 206, 206,0.7)',
          transition: '0.5s',
        }
      }
      borderRadius='12px'>
      {icon}
    </Center>
  );
}
