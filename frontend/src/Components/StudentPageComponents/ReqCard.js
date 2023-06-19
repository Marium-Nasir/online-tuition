import React,{useState,useContext} from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  ButtonGroup,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { InfoContext } from "../../Context/InfoProvider";

const ReqCard = ({requestId,reqName,user,subject,description,fees}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatereqName, setupdatereqName] = useState();
  const [updatedescription, setupdatedescription] = useState();
  const [updatesubject, setupdatesubject] = useState();
  const [updatefees, setupdatefees] = useState();
  const { stuReq, setstuReq } = useContext(InfoContext);

  const updateReq = async(requestId)=>{
    try{
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const {data} = await axios.put('/api/user/updaterequest',{requestId,updatereqName,updatedescription,updatesubject,updatefees},config);

      // setstuReq([data,...stuReq]);

      console.log(data);

    }catch(err){
      console.log(err);
    }
  }
  return (
    <>
      <Card maxW="sm" width={'32%'} height={'20%'} m={1.5} bgColor={'lightgray'}>
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md">{reqName}</Heading>
            <Text>Name : {user.fname} {user.lname}</Text>
            <Text>Email : {user.email}</Text>
            <Text>Subject : {subject}</Text>
            <Text>Description : {description}</Text>
            <Text>Fees : {fees}</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
          <Button variant="solid" bgColor={'lightblue'}>
              View Proposals
            </Button>
            <Button variant="solid" bgColor={'lightblue'} onClick={onOpen}>
              Update
            </Button>
            <Button variant="solid" colorScheme="red" color={'black'} mr={2}>
              Delete
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update a Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={"5px"} fontFamily={"Playfair Display"}>
              <FormControl isRequired>
                <FormLabel>Request Name</FormLabel>
                <Input
                  border={"2px solid gray"}
                  color={"black"}
                  type={"text"}
                  onChange={(e) => setupdatereqName(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Subject</FormLabel>
                <Input
                  border={"2px solid gray"}
                  color={"black"}
                  type={"text"}
                  onChange={(e) => setupdatesubject(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>description</FormLabel>
                <Input
                  border={"2px solid gray"}
                  color={"black"}
                  type={"text"}
                  onChange={(e) => setupdatedescription(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Fees</FormLabel>
                <Input
                  border={"2px solid gray"}
                  color={"black"}
                  type={"text"}
                  onChange={(e) => setupdatefees(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            {/* <Button colorScheme="green" mr={3} onClick={updateReq(requestId)}>
              Update Request
            </Button> */}
            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReqCard;
