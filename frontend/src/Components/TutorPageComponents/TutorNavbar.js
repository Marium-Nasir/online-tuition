import React, { useContext, useState, useEffect } from "react";
import axios, { all } from "axios";
import AllReq from "./AllReq";
import AllPro from "./AllPro";
import Profile from "./Profile";
import {
  IconButton,
  Box,
  Button,
  Avatar,
  Heading,
  Accordion,
  useToast,
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
import { ArrowBackIcon } from "@chakra-ui/icons";
import { InfoContext } from "../../Context/InfoProvider";
import { useNavigate } from "react-router-dom";
import NavHeading from "../NavHeading";

const TutorNavbar = () => {
  const { user, stuReq, setstuReq, proposal, setproposal } =
    useContext(InfoContext);
  const [description, setdescription] = useState();
  const [requestId, setRequestId] = useState();
  const [proposalId, setproposalId] = useState();
  const [fees, setfees] = useState();
  const [loading, setloading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedescription, setupdatedescription] = useState();
  const [updatefees, setupdatefees] = useState();
  const toast = useToast;
  const Navigate = useNavigate();

  // console.log(proposalId);

  const createProposal = async () => {
    setloading(true);
    if (!description || !fees) {
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
          Authorization: `Bearer ${user.token}`,
          "content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/createproposal",
        { requestId, description, fees },
        config
      );

      setproposal(data);

      console.log(data);
      toast({
        title: "Proposal Send Successfuly",
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

  const logoutfun = () => {
    localStorage.removeItem("user-info");
    Navigate("/");
  };

  const getAllProposals = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/user/getproposals", config);
      console.log(data);
      setstuReq([]);
      setproposal(data);
      // return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getallrequestsforall = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "/api/user/getallrequestsforall",
        config
      );
      console.log(data);
      setproposal([]);
      setstuReq(data);
      // return data;
    } catch (err) {
      console.log(err);
    }
  };
  const backToMenuFun = () => {
    setstuReq([]);
    setproposal([])
  };
  return (
    <>
      <Box
        height={"100%"}
        width={"100vw"}
        display={"flex"}
        flex={"row"}
        justifyContent={"center"}
      >
        <Box
          height={"100%"}
          width={{ base: "100%", md: "20%" }}
          bgColor={"black"}
          color={"white"}
          display={{
            base: stuReq.length >= 1 || proposal.length >= 1 ? "none" : "flex",
            md: "flex",
          }}
          alignItems={"center"}
          flexDirection={"column"}
          flexWrap={"nowrap"}
          gap={5}
        >
          <NavHeading />
          <div className="tutorbtns">
            <Profile />
            <Button
              bg={"transparent"}
              color={"white"}
              padding={3}
              pt={6}
              pb={6}
              onClick={getallrequestsforall}
            >
              <Avatar
                size={"sm"}
                src="https://cdn5.vectorstock.com/i/1000x1000/43/84/request-icon-in-different-style-vector-6334384.jpg"
                mr={2}
              />
              Student Requests
            </Button>
            <Button
              bg={"transparent"}
              color={"white"}
              padding={3}
              pt={6}
              pb={6}
              onClick={getAllProposals}
            >
              <Avatar
                size={"sm"}
                src="https://th.bing.com/th/id/R.fba41dbcf0061affdaab7a4a52d8b869?rik=9aKxxmTnncqcAw&pid=ImgRaw&r=0"
                mr={2}
              />
              My Proposals
            </Button>
            <Button
              bg={"transparent"}
              color={"white"}
              padding={3}
              pt={6}
              pb={6}
              onClick={logoutfun}
            >
              <Avatar
                size={"sm"}
                src="https://th.bing.com/th/id/R.45094a3180bea3506454bf9c4d8996cf?rik=ChZsJlNhZCRkhA&riu=http%3a%2f%2fen.iftc.com.tw%2fuploadfiles%2f415%2f06%E6%8A%95%E8%B3%87%E4%BA%BA%E5%B0%88%E5%8D%80%2f48105751-flat-power-off-icon-set-on-round-color-background-light-color-theme-stock-photo.png&ehk=Ad%2f1qKB%2bZ5%2f5mnHn%2bA5qJDVjaj1IH1C%2bk6htL1QgURU%3d&risl=&pid=ImgRaw&r=0"
                mr={2}
              />
              Log Out
            </Button>
          </div>
        </Box>
        <Box
          height={{ md: stuReq ? "auto" : "100%" }}
          width={{ base: "100%", md: "80%" }}
          bgGradient={"linear(to-tl, black, gray.500,blue.700)"}
          color={"white"}
          display={{
            base:
              stuReq.length !== 0 || proposal.length !== 0 ? "flex" : "none",
            md: "flex",
          }}
          flexDirection={"column"}
        >
          <Box display={{ base: "flex", md: "none" }}>
            <IconButton
              variant="solid"
              colorScheme="red"
              icon={<ArrowBackIcon />}
              onClick={backToMenuFun}
            />
          </Box>
          <Heading
            color={"black"}
            fontSize={{ base: "25px", md: "35px" }}
            pt={5}
          >
            Welcome Back {user.fname} {user.lname}
          </Heading>

          <Box>
            <Accordion>
              {stuReq?.map((val, index) => {
                return (
                  <AllReq
                    key={index}
                    id={val._id}
                    reqName={val.reqName}
                    subject={val.subject}
                    description={val.description}
                    fees={val.fees}
                    studentName={val.studentName}
                    clickHandle={onOpen}
                    setRequestId={setRequestId}
                  />
                );
              })}
              {proposal?.map((val, index) => {
                return (
                  <AllPro
                    key={index}
                    id={val._id}
                    description={val.description}
                    fees={val.fees}
                    tutorName={val.tutorName}
                    requestId={val.requestId}
                    clickHandle={onOpen}
                    setproposalId={setproposalId}
                    proposalId={proposalId}
                  />
                );
              })}
              {/* } */}
            </Accordion>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Send a Proposal</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <VStack spacing={"5px"} fontFamily={"Playfair Display"}>
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
                  <Button
                    colorScheme="green"
                    mr={3}
                    onClick={() => {
                      createProposal();
                      onClose();
                    }}
                  >
                    Send
                  </Button>
                  <Button colorScheme="red" onClick={onClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Box>
      </Box>
    </>
  );
};
// export {getAllProposals}
export default TutorNavbar;
