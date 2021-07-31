import { Center } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
export default function Loading() {
  return (
    <Center
      position='absolute'
      top='50%'
      left='50%'
      style={{
        transform: 'translateX(-50%)',
      }}>
      <Spinner height='100px' w='100px' thickness='5px' color='#5E6BF8' />
    </Center>
  );
}
