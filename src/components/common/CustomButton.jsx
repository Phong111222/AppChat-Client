import { Button } from '@chakra-ui/button';
export default function CustomButton({
  type,
  children,
  loading,
  bg,
  ...props
}) {
  return (
    <Button
      // disabled={true}
      _hover={{ opacity: 0.8 }}
      _disabled={{ opacity: 0.8, cursor: 'not-allowed' }}
      _active={{ opacity: 0.7 }}
      _focus={{ outline: 'none' }}
      isLoading={loading}
      type={type}
      w='100%'
      bgGradient={bg ? '' : 'linear(315deg, #7f53ac 0%, #647dee 74%)'}
      bg={bg}
      color='white'
      fontSize='20px'
      h='50px'
      mt='20px'
      {...props}>
      {children}
    </Button>
  );
}
