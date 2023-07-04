import React, { useContext, useState } from "react";
import axios, { all } from "axios";
import Profile from "../TutorPageComponents/Profile";
import { InfoContext } from "../../Context/InfoProvider";
import NavHeading from "../NavHeading";
import {
  Box,
  Text,
  Button,
  Avatar,
  Heading,
  Accordion,
  useToast,
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
  IconButton,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import StuReq from "./StuReq";
import Proposal from "./Proposal";
import CreateRequest from "./CreateRequest";
import { useNavigate } from "react-router-dom";

const StudentNav = () => {
  const { user, stuReq, setstuReq, proposal, setproposal } =
    useContext(InfoContext);
  const toast = useToast();
  const [requestId, setRequestId] = useState();
  const [proposalId, setProposalId] = useState();
  const [updaterequestName, setupdaterequestName] = useState();
  const [updatesubject, setupdatesubject] = useState();
  const [updatedescription, setupdatedescription] = useState();
  const [updatefees, setupdatefees] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Navigate = useNavigate()

  console.log("from nav" + requestId);
  const getallrequestsforstu = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/user/getallrequests", config);
      console.log(data);
      if (data.length === 0) {
        return toast({
          title: "You have not created any request yet!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else {
        setproposal([]);
        setstuReq(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllProForStu = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/user/getproposalforstu?reqId=${requestId}`,
        config
      );
      if (data.length === 0) {
        return toast({
          title: "This request has no proposal!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else {
        setstuReq([]);
        setproposal(data);
      }
    } catch (err) {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const dltRequest = async () => {
    if (window.confirm("Do You Really Want To Delete This Request?")) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
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
        getallrequestsforstu();
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
    }
  };

  const updateRequest = async () => {
    if (
      !updaterequestName ||
      !updatesubject ||
      !updatedescription ||
      !updatefees
    ) {
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

      console.log("updated" + data);
      toast({
        title: "Request Updated Successfuly",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      getallrequestsforstu();
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
    Navigate('/');
  };

  const backToRequest = () => {
    setproposal([]);
    getallrequestsforstu();
  };

  const backToMenuFun = () => {
    setstuReq([]);
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
          display={{ base: stuReq.length >= 1 ? "none" : "flex", md: "flex" }}
          alignItems={"center"}
          flexDirection={"column"}
          flexWrap={"nowrap"}
          gap={5}
        >
          <NavHeading />
          <div className="tutorbtns">
            <Profile />
            <CreateRequest getallrequestsforstu={getallrequestsforstu}/>
            <Button
              bg={"transparent"}
              color={"white"}
              padding={3}
              pt={6}
              pb={6}
              onClick={getallrequestsforstu}
            >
              <Avatar
                size={"sm"}
                src="https://cdn5.vectorstock.com/i/1000x1000/43/84/request-icon-in-different-style-vector-6334384.jpg"
                mr={2}
              />
              My Requests
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
          display={{ base: stuReq.length !== 0 ? "flex" : "none", md: "flex" }}
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
            pt={2}
            fontSize={{ base: "25px", md: "35px" }}
          >
            Welcome Back {user.fname} {user.lname}
          </Heading>

          <Box>
            <Accordion>
              {stuReq?.map((val, index) => {
                return (
                  <StuReq
                    key={index}
                    id={val._id}
                    reqName={val.reqName}
                    studentName={val.studentName}
                    subject={val.subject}
                    description={val.description}
                    fees={val.fees}
                    setRequestId={setRequestId}
                    requestId={requestId}
                    getAllProForStu={getAllProForStu}
                    dltRequest={dltRequest}
                    updateRequest={updateRequest}
                    onOpen={onOpen}
                  />
                );
              })}

              {proposal?.map((val, index) => {
                return (
                  <Proposal
                    key={index}
                    id={val._id}
                    tutorName={val.tutorName}
                    requestId={val.requestId}
                    description={val.description}
                    fees={val.fees}
                    setproposalId={setRequestId}
                    proposalId={proposalId}
                    backToRequest={backToRequest}
                  />
                );
              })}
            </Accordion>
          </Box>
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
                <Button
                  colorScheme="blue"
                  variant={"outline"}
                  mr={3}
                  onClick={() => {
                    updateRequest();
                  }}
                >
                  Update
                </Button>
                <Button colorScheme="red" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
    
      </Box>
    </>
  );
};

export default StudentNav;
