import { Input, Flex, Box, Center } from '@chakra-ui/react';
export default function Searchbox({ ...props }) {
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
            focusBorderColor='#647dee'
            bg='#e8eaef'
            h='40px'
            borderRadius='15px'
            placeholder='Search conversation'
            _placeholder={{ fontSize: 15 }}
          />
        </Center>
      </Flex>
      <Center>
        <Box w='90%' borderTop='1px solid #e1e4ea' mb='10px' />
      </Center>
    </>
  );
}
