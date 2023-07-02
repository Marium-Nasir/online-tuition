import React from 'react';
import { Heading } from '@chakra-ui/react';

const NavHeading = () => {
  return (
    <>
      <Heading
          color={"lightblue"}
          mt={3}
          mr={{base:'10px'}}
          fontSize={{ base: "35px", md: "35px" }}
        >
          Online Tuition
        </Heading>
    </>
  )
}

export default NavHeading
