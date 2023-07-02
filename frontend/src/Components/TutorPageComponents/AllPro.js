import React, { useState, useContext } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
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
  useToast,
} from "@chakra-ui/react";
import { InfoContext } from "../../Context/InfoProvider";
import axios from "axios";

// import { getAllProposals } from "./TutorNavbar";
const AllPro = ({
  tutorName,
  requestId,
  description,
  fees,
  proposalId,
  setproposalId,
  id,
}) => {
  const { user} = useContext(InfoContext);
  const [updatedescription, setupdatedescription] = useState();
  const [updatefees, setupdatefees] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [loading, setloading] = useState(false);
 
  console.log(`from proposal modal ${proposalId}`);
  const updateProposal = async () => {
    setloading(true);
    if (!updatedescription || !updatefees) {
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
  }

  return (
    <>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left" fontWeight={"bold"}>
             {/* <Text>Request Name : {requestId}</Text> */}
             {tutorName.fname} {tutorName.lname}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Text>Tutor email : {tutorName.email}</Text>
          <Text>Description: {description}</Text>
          <Text>Fees : {fees}</Text>
          <Box>
            <Button
              colorScheme="gray"
              variant="outline"
              mr={2}
              onClick={() => {
                onOpen();
                setproposalId(id);
              }}
            >
              Update Proposal
            </Button>
            <Button
              colorScheme="red"
              variant="outline"
              onClick={() => {
                setproposalId(id);
                deleteProposal()
              }}
            >
              Delete Proposal
            </Button>
          </Box>
        </AccordionPanel>
      </AccordionItem>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Proposal</ModalHeader>
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
            <Button
              colorScheme="green"
              variant={"outline"}
              mr={3}
              onClick={() => {
                updateProposal();
                onClose();
              }}
            >
              Update Proposal
            </Button>
            {/* <Button
              colorScheme="red"
              variant={"outline"}
              mr={3}
              onClick={() => {
                deleteProposal();
                onClose();
              }}
            >
              Delete Proposal
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AllPro;
