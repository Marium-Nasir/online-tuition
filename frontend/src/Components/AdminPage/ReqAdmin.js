import React,{useContext,useState} from 'react';
import { InfoContext } from '../../Context/InfoProvider';
import axios from 'axios';

import {
        Box,
    Button,
    Text,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  FormControl,
  FormLabel,
  Input,
  useToast
  } from "@chakra-ui/react";

const ReqAdmin = ({reqName,studentName,subject,description,fees,setRequestId,id,requestId,getallrequestsforadmin}) => {
    const { user} =
    useContext(InfoContext);
    const [updaterequestName,setupdaterequestName] = useState();
    const [updatesubject,setupdatesubject] = useState();
    const [updatedescription,setupdatedescription] = useState();
    const [updatefees,setupdatefees] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const dltRequest = async()=>{
        if(window.confirm("Do You Really Want To Delete This Request?"))
        {try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`
            },
          };
       
          const { data } = await axios.delete(
            `/api/user/deleterequest?dltId=${requestId}`,
            config
          );
    
          console.log(data);
          toast({
            title: "Proposal Deleted Successfuly",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          getallrequestsforadmin();
        } catch (err) {
          toast({
            title: "Error Occured",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          console.log(err);
        }}
      }
    
      const updateRequest = async () => {
        if ( !updaterequestName|| !updatesubject|| !updatedescription|| !updatefees) {
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
              Authorization: `Bearer ${user.token}`
            },
          };
    
          const { data } = await axios.patch(
            `/api/user/updaterequest?updId=${requestId}`,
            {
              updaterequestName,
              updatesubject,
              updatedescription,
              updatefees,  
            },
            config
          );
    
          console.log("updated"+data);
          toast({
            title: "Request Updated Successfuly",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          getallrequestsforadmin();
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
    console.log("from compo "+requestId);
  return (
    <>
      <AccordionItem>
     <h2>
    <AccordionButton>
        <Box as="span" flex='1' textAlign='left' fontWeight={'bold'}>
          {reqName}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      <Text>Student Name : {studentName.fname} {studentName.lname}</Text>
      <Text>Student email : {studentName.email}</Text>
      <Text>Subject : {subject}</Text>
      <Text>Description: {description}</Text>
      <Text>Fees : {fees}</Text>
      <Box>
      <Button mr={2} colorScheme='gray' variant='outline' onClick={()=>{onOpen();setRequestId(id)}} >
    Update 
  </Button>
      {/* <Button mr={2} colorScheme='gray' variant='outline' onClick={()=>{setRequestId(id);getAllProForStu()}} >
    Show All Proposals 
  </Button> */}
        <Button colorScheme='red' variant='outline' onClick={()=>{setRequestId(id);dltRequest()}}>
        Delete
    </Button>
      </Box>
    </AccordionPanel>
    </AccordionItem>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <VStack spacing={"5px"} fontFamily={"Playfair Display"}>
              <FormControl isRequired>
                <FormLabel>Request Name</FormLabel>
                <Input
                  border={"2px solid gray"}
                  color={"black"}
                  type={"text"}
                  onChange={(e) => setupdaterequestName(e.target.value)}
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
                <FormLabel>Description</FormLabel>
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
            <Button colorScheme='blue' variant={'outline'} mr={3} onClick={()=>{updateRequest()}}>
              Update
            </Button>
            <Button colorScheme='red' variant='outline' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ReqAdmin