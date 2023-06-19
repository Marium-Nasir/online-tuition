import React,{useState,useContext} from "react";
import axios from "axios";
import {
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
// import { InfoState } from "../../Context/InfoProvider";
import {InfoContext} from '../../Context/InfoProvider'
import { ChevronDownIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const [reqName, setreqName] = useState();
  const [description, setdescription] = useState();
  const [subject, setsubject] = useState();
  const [fees, setfees] = useState();
  const [loading, setloading] = useState(false);
  const { user } = useContext(InfoContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const toast = useToast;

  const createRequest = async()=>{
    setloading(true)
    if(!reqName||!subject||!description||!fees){
      toast({
        title: "Please Fill All The Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setloading(false);
      return;
    }
    try{
      const config = {
        headers: {
          Authorization:`Bearer ${user.token}`,
          "content-type": "application/json",
        },
      }
      const {data} = await axios.post('/api/user/createrequest',{reqName,subject,description,fees},config);

      console.log(data);
      
      toast({
        title: "Request Created",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      setloading(false);

    }catch(err){
      toast({
        title: "Error Occured",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      console.log(err);
    }
  };

  const logoutfun = () => {
    localStorage.removeItem("user-info");
    window.location.href = "/";
  };

  return (
    <>
      <Box
        height={"8%"}
        width={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        backgroundColor={"white"}
        color={"black"}
        bgColor={'gray'}
        p={2}
      >
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          Online Tuition
        </Text>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {user.fname} {user.lname}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onOpen}>Add a new request</MenuItem>
            <MenuItem onClick={logoutfun}>Logout</MenuItem>
          </MenuList>
        </Menu>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new Request</ModalHeader>
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
                <FormLabel>description</FormLabel>
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
            <Button colorScheme="green" mr={3} onClick={createRequest}>
              Create
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Box>
    </>
  );
};

export default Navbar;
