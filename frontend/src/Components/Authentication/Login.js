import React, { useState } from "react";
// import useAuth from '../../hooks/useAuth';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  useToast,
  Box,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, Link, useLocation,Navigate } from "react-router-dom";

const Login = () => {
  // const {setUser} = useAuth()
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();

  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const location = useLocation();
  const Navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill All The Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("user-info", JSON.stringify(data));
      setLoading(false);
      if ((data && data.role === "student") || data.role === "Student") {
        // Navigate("/student");
        window.location.href='/student'
      } else if ((data && data.role === "admin") || data.role === "Admin") {
        // Navigate("/admin");
        window.location.href='/admin'
      } else if ((data && data.role === "Tutor") || data.role === "tutor") {
        // Navigate("/tutor");
        window.location.href='/tutor'
      } else {
        window.location.href='/'
        // Navigate("/");
      }
    } catch (err) {
      toast({
        title: "Invalid Credentials",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);

      console.log(err);
    }
  };

  return (
    <>
      <Box
        height={{ md: "90%", base: "80%" }}
        width={"90%"}
        border={"5px inset green"}
        borderRadius={"lg"}
        display={"flex"}
      >
        <Box
          className="sideimage"
          height={"100%"}
          width={{ md: "65%", base: "none" }}
          //  bg={'red'}
        ></Box>
        <Box
          className="loginside"
          height={"100%"}
          width={{ md: "35%", base: "100%" }}
          boxSizing="border-box"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          color={"white"}
          bgGradient={"linear(to-tr, black, blue.900,#A0C49D)"}
          pt={3}
        >
          <Box className="userAvatar" p={{ base: "15%", md: "10%" }}></Box>
          <Text mb={7} color={"white"} fontWeight={"bold"} fontSize={"2xl"}>
            Sign-in
          </Text>

          <VStack spacing={"3px"} fontFamily={"Playfair Display"}>
            <FormControl id="logemail" isRequired>
              <Input
                placeholder="Enter Your Email"
                _placeholder={{ color: "lightgray" }}
                border={"2px solid gray"}
                borderTop={"none"}
                borderRight={"none"}
                borderLeft={"none"}
                borderColor={"green.900"}
                type={"email"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="logpassword" isRequired>
              <InputGroup>
                <Input
                  placeholder="Enter Password"
                  _placeholder={{ color: "lightgray" }}
                  border={"2px solid gray"}
                  borderTop={"none"}
                  borderRight={"none"}
                  borderLeft={"none"}
                  borderColor={"green.900"}
                  width={"100%"}
                  mt={4}
                  type={show ? "text" : "password"}
                  onChange={(e) => setpassword(e.target.value)}
                />
                <InputRightElement>
                  <Button
                    h="1.75rem"
                    mt={8}
                    size="lg"
                    mr={"1.5rem"}
                    onClick={handleClick}
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              colorScheme="green"
              bgColor="lightgray"
              size="md"
              mt={3}
              fontWeight={"bold"}
              color={"green.900"}
              borderWidth={2}
              pr={20}
              pl={20}
              fontSize={{ base: "18px", md: "22px" }}
              onClick={submitHandler}
              isLoading={loading}
            >
              Sign-in
            </Button>
            <Button
              onClick={() => Navigate('/signuppage')}
              colorScheme="green"
              bgColor="lightgray"
              size="md"
              mt={3}
              fontWeight={"bold"}
              color={"green.900"}
              borderWidth={2}
              pr={20}
              pl={20}
              fontSize={{ base: "18px", md: "22px" }}
            >
              Sign-up
            </Button>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default Login;
