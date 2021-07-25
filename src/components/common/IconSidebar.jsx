import { Flex } from '@chakra-ui/layout';
export default function IconSidebar({ icon, active, onClick, ...props }) {
  return (
    <Flex
      justifyContent='center'
      bg={active && '#5a5fff'}
      _hover={{
        background: '#5a5fff',
        cursor: 'pointer',
        transition: '0.5s',
      }}
      onClick={onClick}
      {...props}>
      {icon}
    </Flex>
  );
}
