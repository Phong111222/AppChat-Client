import { FormErrorMessage } from '@chakra-ui/form-control';
import { AnimatePresence, motion, motiton } from 'framer-motion';
export default function FormError({ error }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}>
          <FormErrorMessage position='absolute'>
            {error.message}
          </FormErrorMessage>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
