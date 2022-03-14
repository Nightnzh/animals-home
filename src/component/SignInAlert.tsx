
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  ChakraProps,
  Button,
  AlertDialogProps
} from '@chakra-ui/react'
import { useRef, useState } from 'react'



//TODO:Use firebase google login

interface AuthProps {
  isLogin : Boolean
}

const SignInAlert = ( authProps : AuthProps ) => {


  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  // const cancelRef = useRef()

  return (
    <>
      <Button colorScheme="red">
        Sign in
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={undefined}
        onClose={onClose}
      >

      </AlertDialog>
    </>
  )
}



export default SignInAlert