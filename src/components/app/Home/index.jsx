import { Box, Text, Center, Heading, Image } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box w='73vw'>
      <Center h='100vh' flexDirection='column'>
        <Box mb='15px' color='#4d4d4d'>
          <Heading as='h1' fontSize='50px'>
            WELCOME TO <strong>PCHAT</strong>
          </Heading>
        </Box>
        <Box mb='15px'>
          <Text fontSize='25px' color='#4d4d4d'>
            {"Let's chat with your friend"}
          </Text>
        </Box>
        <Box>
          <Image src='/img/HomeImg.jpg' width={380} />
        </Box>
      </Center>
    </Box>
  );
}
