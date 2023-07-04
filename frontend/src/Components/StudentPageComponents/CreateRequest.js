import React,{useContext,useState} from 'react';
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
    VStack,
  FormControl,
  FormLabel,
  Input,
    useDisclosure,
   useToast
  } from '@chakra-ui/react';
  import { InfoContext } from "../../Context/InfoProvider";
  import axios from 'axios';

const CreateRequest = () => {
  const { user, setstuReq } =
  useContext(InfoContext);
  const [reqName,setreqName] = useState();
  const [subject,setsubject] = useState();
  const [description,setdescription] = useState();
  const [fees,setfees] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()

  const createRequest = async (getallrequestsforstu) => {
    if (!reqName||!subject||!description || !fees) {
      toast({
        title: "Please Fill All The Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/createrequest",
        { reqName,subject, description, fees },
        config
      );

      console.log(data);
      toast({
        title: "Request Created Successfuly",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setstuReq(data);
      getallrequestsforstu()
    } catch (err) {
      toast({
        title: "Error Occured",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.log(err);
    }
  };
  return (
    <>
    <Button
            bg={"transparent"}
            color={"white"}
            padding={3}
            pt={6}
            pb={6}
            onClick={onOpen}
          >
            <Avatar
              size={"sm"}
              src="https://th.bing.com/th/id/OIP.GE4J_8mJ1weN6D1Mg15L-wHaHa?w=161&h=180&c=7&r=0&o=5&pid=1.7"
              mr={2}
            />
            Create Request
          </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <VStack spacing={"5px"} fontFamily={"Playfair Display"}>
              <FormControl isRequired>
                <FormLabel>Request Name</FormLabel>
                <Input
                  border={"2px solid gray"}
                  color={"black"}
                  type={"text"}
                  onChange={(e) => setreqName(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Subject</FormLabel>
                <Input
                  border={"2px solid gray"}
                  color={"black"}
                  type={"text"}
                  onChange={(e) => setsubject(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  border={"2px solid gray"}
                  color={"black"}
                  type={"text"}
                  onChange={(e) => setdescription(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Fees</FormLabel>
                <Input
                  border={"2px solid gray"}
                  color={"black"}
                  type={"text"}
                  onChange={(e) => setfees(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' variant={'outline'} mr={3} onClick={()=>{createRequest();onClose()}}>
              Create
            </Button>
            <Button colorScheme='red' variant='outline' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateRequest
