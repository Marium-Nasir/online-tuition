import React,{useContext} from 'react';
import {
  Avatar,
  Text,
  Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
   
  } from '@chakra-ui/react';
  import { InfoContext } from "../../Context/InfoProvider";

const Profile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } =
    useContext(InfoContext);
  return (
    <>
      <Button bg={"transparent"} color={"white"} padding={3} pt={6} pb={6} onClick={onOpen}>
            <Avatar
              size={"sm"}
              src="https://th.bing.com/th/id/OIP.lcdOc6CAIpbvYx3XHfoJ0gHaF3?pid=ImgDet&rs=1"
              mr={2}
            />
            Profile
          </Button>
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{user.fname} {user.lname}</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <Text>Email : {user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' variant='outline' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
          
    </>
  )
}

export default Profile
