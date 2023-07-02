import React, { useContext, useState} from "react";
import axios from "axios";
import Profile from "../TutorPageComponents/Profile";
import { InfoContext } from "../../Context/InfoProvider";
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

const ProposalForAdmin = ({
    tutorName,
    requestId,
    description,
    fees,
    setproposalId,
    id,
    proposalId,
    getallproposalsforadmin
}) => {
  const { user} =
  useContext(InfoContext);
  const [updatedescription, setupdatedescription] = useState();
  const [updatefees, setupdatefees] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()

  const deleteProposal = async()=>{
    if(window.confirm("Do You Really Want To Delete This Proposal?")){
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        },
      };
   
      const { data } = await axios.delete(
        `/api/user/deleteproposal?dltId=${proposalId}`,
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
  };

  const updateProposal = async () => {
    if (!updatedescription || !updatefees) {
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
        `/api/user/updateproposal?updId=${proposalId}`,
        {
          updatedescription,
          updatefees   
        },
        config
      );

      console.log(data);
      toast({
        title: "Proposal Updated Successfuly",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      getallproposalsforadmin()
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
console.log(tutorName)
  return (
    <>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left" fontWeight={"bold"}>
            {tutorName.fname} {tutorName.lname}
              {/* All Proposals */}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Text fontWeight={"bold"}>
            Tutor Name : {tutorName.fname} {tutorName.lname}
          </Text>
          <Text>Tutor email : {tutorName.email}</Text>
          <Text>Description: {description}</Text>
          <Text>Fees : {fees}</Text>
          <Box>
            <Button
              colorScheme="gray"
              variant="outline"
              onClick={() => {
                onOpen()
                setproposalId(id);
              }}
            >
              Update
            </Button>
            <Button
              colorScheme="gray"
              variant="outline"
              onClick={() => {
                setproposalId(id);
                deleteProposal()
              }}
            >
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
            <Button colorScheme='blue' variant={'outline'} mr={3} onClick={()=>{updateProposal()}}>
              Update
            </Button>
            <Button colorScheme='red' variant='outline' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProposalForAdmin
