import { Box, Text, Flex, FormControl, Input, Center } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { BiSend } from 'react-icons/bi';
import CustomButton from '../../common/CustomButton';
import { CgImage } from 'react-icons/cg';
import { RiFileListFill } from 'react-icons/ri';
import CustomIcon from '../../common/CustomIcon';
import Message from '../../common/Message';
import CustomScrollbars from '../../common/CustomScrollbar';
import CustomAvatar from '../../common/CustomAvatar';
export default function Chatbox() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    reset(['message']);
  };

  return (
    <Box w='50%'>
      <Flex h='10vh' border='1px solid #e1e4ea' px='15px' alignItems='center'>
        <Center>
          <CustomAvatar
            w='50px'
            h='50px'
            src='https://i1.sndcdn.com/avatars-000214125831-5q6tdw-t500x500.jpg'
          />
          <Box ml='15px'>
            <Text fontWeight='extrabold' fontSize='18px'>
              Phong
            </Text>
            <Text color='GrayText' fontSize='12px' fontWeight='bold'>
              4 hours ago
            </Text>
          </Box>
        </Center>
      </Flex>
      <Flex
        flexDirection='column'
        justifyContent='flex-end'
        h='75vh'
        bg='gray.50'
        px='10px'
        pb='20px'>
        <Box
          w='100%'
          overflowY='scroll'
          css={{
            '&::-webkit-scrollbar': {
              width: '5px',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#cecece',
              borderRadius: '24px',
            },
          }}>
          {/* <Message
            own={true}
            text='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
        necessitatibus error amet, expedita laborum eaque ea id quos tenetur
        adipisci deleniti doloremque vitae reiciendis alias itaque sapiente
        aliquam enim esse.'
          />
          <Message
            own={false}
            text='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
        necessitatibus error amet, expedita laborum eaque ea id quos tenetur
        adipisci deleniti doloremque vitae reiciendis alias itaque sapiente
        aliquam enim esse.'
          />
          <Message
            own={false}
            text='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
        necessitatibus error amet, expedita laborum eaque ea id quos tenetur
        adipisci deleniti doloremque vitae reiciendis alias itaque sapiente
        aliquam enim esse.'
          />
          <Message
            own={true}
            text='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
        necessitatibus error amet, expedita laborum eaque ea id quos tenetur
        adipisci deleniti doloremque vitae reiciendis alias itaque sapiente
        aliquam enim esse.'
          />
          <Message
            own={true}
            text='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
        necessitatibus error amet, expedita laborum eaque ea id quos tenetur
        adipisci deleniti doloremque vitae reiciendis alias itaque sapiente
        aliquam enim esse.'
          />
          <Message
            own={false}
            text='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
        necessitatibus error amet, expedita laborum eaque ea id quos tenetur
        adipisci deleniti doloremque vitae reiciendis alias itaque sapiente
        aliquam enim esse.'
          />
          <Message
            own={true}
            text='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
        necessitatibus error amet, expedita laborum eaque ea id quos tenetur
        adipisci deleniti doloremque vitae reiciendis alias itaque sapiente
        aliquam enim esse.'
          />
          <Message
            own={true}
            text='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
        necessitatibus error amet, expedita laborum eaque ea id quos tenetur
        adipisci deleniti doloremque vitae reiciendis alias itaque sapiente
        aliquam enim esse.'
          />
          <Message
            own={false}
            text='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
        necessitatibus error amet, expedita laborum eaque ea id quos tenetur
        adipisci deleniti doloremque vitae reiciendis alias itaque sapiente
        aliquam enim esse.'
          />
          <Message
            own={true}
            text='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
        necessitatibus error amet, expedita laborum eaque ea id quos tenetur
        adipisci deleniti doloremque vitae reiciendis alias itaque sapiente
        aliquam enim esse.'
          /> */}
          <Message own={true} text='scroll' />
        </Box>
      </Flex>
      <Flex h='15vh' flexDirection='column' borderTop='1px solid #e1e4ea'>
        <Flex w='95%' mx='auto' h='8vh'>
          <CustomIcon icon={<CgImage color='grey' size='25px' />} />
          <CustomIcon icon={<RiFileListFill color='grey' size='25px' />} />
        </Flex>
        <Flex alignItems='center'>
          <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
            <FormControl display='flex' alignItems='center'>
              <Input
                h='7vh'
                w='90%'
                borderRadius='none'
                _focus={{ borderTop: '1px solid #647dee' }}
                placeholder='Message ...'
                {...register('message')}
              />

              <CustomButton
                bg='#647dee'
                borderRadius='none'
                h='7vh'
                w='10%'
                mt='0'>
                <BiSend />
              </CustomButton>
            </FormControl>
          </form>
        </Flex>
      </Flex>
    </Box>
  );
}
