import { Button } from '@chakra-ui/button';
export default function CustomButton({ type, children, loading, ...props }) {
  return (
    <Button
      // disabled={true}
      _hover={{ opacity: 0.8 }}
      _disabled={{ opacity: 0.8, cursor: 'not-allowed' }}
      isLoading={loading}
      type={type}
      w='100%'
      bgGradient='linear(315deg, #7f53ac 0%, #647dee 74%)'
      color='white'
      fontSize='20px'
      h='50px'
      _active={{ opacity: 0.7 }}
      _focus={{ outline: 'none' }}
      mt='20px'
      {...props}>
      {children}
    </Button>
  );
}
