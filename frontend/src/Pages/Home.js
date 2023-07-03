import React,{useEffect} from 'react';
import {Box} from '@chakra-ui/react';
import Login from '../Components/Authentication/Login';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const Navigate = useNavigate()
  useEffect(()=>{
    let user = JSON.parse(localStorage.getItem("user-info"))
    if (!user) Navigate('/')
    else if(user && user.role === 'student' || user.role === "Student"){
      Navigate('/student')
    }
    else if(user && user.role === 'admin' || user.role === "Admin"){
      Navigate('/admin')
    }
    else if(user && user.role === 'tutor' || user.role === "Tutor"){
      Navigate('/tutor')
    }
 },[Navigate]);
  return (
    <>
      <Box
        height={'100vh'}
        display="flex"
        justifyContent="center"
        alignItems={'center'}
        border="3px solid white"
        borderRadius=".5rem"
        textAlign="center"
        w="100vw"
        bgColor={{md:'whitesmoke',base:'lightblue'}}
        // bgGradient={'linear(to-tr, black, gray.600,red.800)'}
        p={2}
        boxSizing="border-box"
        // mt="20px"
        borderTop={'none'}

      >
        <Login />
      </Box>
    </>
  )
}

export default Home
