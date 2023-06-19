import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email,setEmail] = useState();
  const [password, setpassword] = useState();

  const [loading, setLoading] = useState(false);
  const toast = useToast();
  
  const handleClick = () => setShow(!show);
  // const Navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true)
    if (!email ||!password) {
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
          if(data.role === "admin"){
           window.location.href = '/admin'
          }
          else if(data.role === "student"||data.role === "Student"){
            window.location.href = '/student'
           }
           else{
            window.location.href = '/tutor'
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
    <VStack spacing={"5px"} fontFamily={"Playfair Display"}>

    <FormControl id="logemail" isRequired>
          <FormLabel color={"white"}>Enter Your Email</FormLabel>
          <Input
            border={"2px solid gray"}
            color={"white"}
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
      
          <FormControl id="logpassword" isRequired>
            <FormLabel color={"white"}>Enter Password</FormLabel>
            <InputGroup>
              <Input
                border={"2px solid gray"}
                color={"white"}
                type={show ? "text" : "password"}
                onChange={(e) => setpassword(e.target.value)}
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

          <Button
          colorScheme="teal"
          variant="outline"
          size="lg"
          color={"white"}
          width={"50%"}
          onClick={submitHandler}
          isLoading={loading}
        >
          Login
        </Button>
    </VStack>
      
    </>
  )
}

export default Login
