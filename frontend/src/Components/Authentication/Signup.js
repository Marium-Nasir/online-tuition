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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

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

  const handleClick = () => setShow(!show);
 

  const submitHandler = async () => {
    setLoading(true);
    if (value === "1") {
      setRole("Student");
    } else if(value === "2"){
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
        if(data.role === "admin"){
          window.location.href = '/admin'
         }
         else if(data.role === "student"){
           window.location.href = '/student'
          }
          else{
           window.location.href = '/tutor'
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
    <div>
      <VStack spacing={"5px"} fontFamily={"Playfair Display"}>
        <Box display={"flex"}>
          <FormControl id="fname" isRequired>
            <FormLabel color={"white"}>Enter First Name</FormLabel>
            <Input
              border={"2px solid gray"}
              color={"white"}
              type={"text"}
              onChange={(e) => setFname(e.target.value)}
            />
          </FormControl>

          <FormControl id="lname" isRequired>
            <FormLabel color={"white"}>Enter Last Name</FormLabel>
            <Input
              ml={"5%"}
              border={"2px solid gray"}
              color={"white"}
              type={"text"}
              onChange={(e) => setLname(e.target.value)}
            />
          </FormControl>
        </Box>

        <FormControl id="phone" isRequired>
          <FormLabel color={"white"}>Enter Contact Number</FormLabel>
          <Input
            border={"2px solid gray"}
            color={"white"}
            type={"text"}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormControl>

        <FormControl id="role" isRequired>
          <FormLabel color={"white"}>Select Role</FormLabel>

          <RadioGroup onChange={setvalue} value={value}>
            <Stack direction="row" color={'white'}>
              <Radio value="1">Student</Radio>
              <Radio value="2">Tutor</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl id="email" isRequired>
          <FormLabel color={"white"}>Enter Your Email</FormLabel>
          <Input
            border={"2px solid gray"}
            color={"white"}
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Box display={"flex"}>
          <FormControl id="password" isRequired>
            <FormLabel color={"white"}>Enter Password</FormLabel>
            <InputGroup>
              <Input
                border={"2px solid gray"}
                color={"white"}
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
            <FormLabel color={"white"}>Enter Confirm Password</FormLabel>
            <InputGroup>
              <Input
                ml={"5%"}
                border={"2px solid gray"}
                color={"white"}
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

        <Button
          colorScheme="teal"
          variant="outline"
          size="lg"
          color={"white"}
          width={"50%"}
          onClick={submitHandler}
          isLoading={loading}
        >
          Signup
        </Button>
      </VStack>
    </div>
  );
};

export default Signup;
