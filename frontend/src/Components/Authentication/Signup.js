import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  useToast,
  Radio,
  RadioGroup,
  Box,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [phone, setPhone] = useState();
  const [role, setRole] = useState("");
  const [cpassword, setCPassword] = useState();
  const [value, setvalue] = useState();

  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const Navigate = useNavigate()

 
  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (value === "1") {
      setRole("Student");
    } else if (value === "2") {
      setRole("Tutor");
    }
    if (
      !fname ||
      !lname ||
      !phone ||
      !role ||
      !email ||
      !password ||
      !cpassword
    ) {
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
    if (password === cpassword) {
      try {
        const config = {
          headers: {
            "content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/user",
          { fname, lname, phone, role, email, password },
          config
        );

        toast({
          title: "Registered Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        console.log(data);
        // return;
        localStorage.setItem("user-info", JSON.stringify(data));
        setLoading(false);
        if ((data && data.role === "student") || data.role === "Student") {
          Navigate("/student");
        } else if ((data && data.role === "admin") || data.role === "Admin") {
          Navigate("/admin");
        } else if ((data && data.role === "Tutor") || data.role === "tutor") {
          Navigate("/tutor");
        } else {
          Navigate("/");
        }
      } catch (err) {
        toast({
          title: "Error Occured",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);

        console.log(err);
      }
    } else {
      toast({
        title: "Password Not Matched",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        height={"100%"}
        width={"90%"}
        border={"5px inset green"}
        borderRadius={"lg"}
        display={"flex"}
      >
        <Box 
        className="sideimagesignup" 
        height={"100%"} 
        width={{md:"43%",base:'0%'}} 
        pt={4}>
          <Heading
          display={{base:'none'}}
          >Welcome To Online Tuition</Heading>
        </Box>
        <Box
          className="loginside"
          height={"100%"}
          width={{md:"57%",base:'100%'}}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          // m={10}
          bgGradient={'linear(to-tr, black, green.600,#A0C49D)'}
          pt={3}
        >
          <Box 
          className="userAvatar"
          p={{base:'15%',md:'10%'}}
          ></Box>
          <Text mb={7} textColor={"lightgray"} fontWeight={"bold"} fontSize={"2xl"}>
            Sign-up
          </Text>

          <VStack spacing={{base:"20px",md:'4px'}} fontFamily={"Playfair Display"}>
            <Box 
            display={"flex"}
            flexDirection={{md:'row',base:'column'}}
            >
              <FormControl id="fname" isRequired>
                <Input
                  placeholder="Enter First Name"
                  _placeholder={{ color: "lightgray" }}
                  border={"2px solid lightgray"}
                  borderTop={"none"}
                  borderRight={"none"}
                  borderLeft={"none"}
                  borderColor={"green.900"}
                  color={"lightgray"}
                  type={"text"}
                  onChange={(e) => setFname(e.target.value)}
                />
              </FormControl>

              <FormControl id="lname" isRequired>
                <Input
                  // ml={"5%"}
                  placeholder="Enter Last Name"
                  _placeholder={{ color: "lightgray" }}
                  border={"2px solid lightgray"}
                  borderTop={"none"}
                  borderRight={"none"}
                  borderLeft={"none"}
                  borderColor={"green.900"}
                  color={"lightgray"}
                  type={"text"}
                  onChange={(e) => setLname(e.target.value)}
                />
              </FormControl>
            </Box>

            <FormControl id="phone" isRequired>
              <Input
                placeholder="Enter Phone Number"
                _placeholder={{ color: "lightgray" }}
                border={"2px solid lightgray"}
                borderTop={"none"}
                borderRight={"none"}
                borderLeft={"none"}
                borderColor={"green.900"}
                color={"lightgray"}
                type={"text"}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormControl>

            <FormControl id="role" isRequired>
              <RadioGroup onChange={setvalue} value={value}>
                <Stack direction="row" color={"lightgray"}>
                  <Radio value="1">Student</Radio>
                  <Radio value="2">Tutor</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl id="email" isRequired>
              <Input
                placeholder="Enter Your Email"
                _placeholder={{ color: "lightgray" }}
                border={"2px solid lightgray"}
                borderTop={"none"}
                borderRight={"none"}
                borderLeft={"none"}
                borderColor={"green.900"}
                color={"lightgray"}
                type={"email"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <Box 
            display={"flex"}
              flexDirection={{md:'row',base:'column'}}
              >
              <FormControl>
                <InputGroup>
                  <Input
                    placeholder="Enter Password"
                    _placeholder={{ color: "lightgray" }}
                    border={"2px solid lightgray"}
                    borderTop={"none"}
                    borderRight={"none"}
                    borderLeft={"none"}
                    borderColor={"green.900"}
                    color={"lightgray"}
                    type={show ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <Button
                      h="1.75rem"
                      size="lg"
                      mr={"1.5rem"}
                      onClick={handleClick}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl id="cpassword" isRequired>
                <InputGroup>
                  <Input
                    ml={{md:"5%",base:'0%'}}
                    placeholder="Enter Confirm Password"
                    _placeholder={{ color: "lightgray" }}
                    border={"2px solid lightgray"}
                    borderTop={"none"}
                    borderRight={"none"}
                    borderLeft={"none"}
                    borderColor={"green.900"}
                    color={"lightgray"}
                    type={show ? "text" : "password"}
                    onChange={(e) => setCPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <Button
                      h="1.75rem"
                      size="md"
                      mr={"1.5rem"}
                      onClick={handleClick}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Box>
           <Box 
           display={'flex'}
           flexDirection={{md:'row',base:'column'}}
           >
            <Button
              colorScheme="green"
              bgColor="lightlightgray"
              size="md"
              mr={{md:'5',base:'0%'}}
              mt={3}
              fontWeight={"bold"}
              color={"green.900"}
              borderWidth={2}
              pr={20}
              pl={20}
              fontSize={{base:'18px',md:'22px'}}
              onClick={submitHandler}
              isLoading={loading}
            >
              Sign-up
            </Button>
            <Button
              onClick={() => Navigate('/')}
              colorScheme="green"
              bgColor="lightlightgray"
              size="md"
              mt={3}
              pr={20}
              pl={20}
              fontWeight={"bold"}
              color={"green.900"}
              borderWidth={2}
              fontSize={{base:'18px',md:'22px'}}
              isLoading={loading}
            >
              Sign-in
            </Button>
            </Box>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default Signup;
