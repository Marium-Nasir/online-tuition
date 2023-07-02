import React from 'react';
import Signup from '../Components/Authentication/Signup';
import {Box} from '@chakra-ui/react'

const SignupPage = () => {
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
        bgColor={{md:"whitesmoke",base:'lightblue'}}
        // bgGradient={'linear(to-tr, black, gray.600,red.800)'}
        p={2}
        boxSizing="border-box"
        // mt="20px"
        borderTop={'none'}

      >
        <Signup />
      </Box>
    </>
  )
}

export default SignupPage
