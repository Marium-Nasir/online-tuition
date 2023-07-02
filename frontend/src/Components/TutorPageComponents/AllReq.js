import React from 'react';
import {
    Box,
    Button,
    Text,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from "@chakra-ui/react";

const AllReq = ({reqName,subject,description,fees,studentName,clickHandle, setRequestId,id}) => {
    // const { user, stuReq, setstuReq } = useContext(InfoContext);
  return (
    <>
     <AccordionItem>
     <h2>
    <AccordionButton>
        <Box as="span" flex='1' textAlign='left' fontWeight={'bold'}>
          {reqName}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      <Text>Student Name : {studentName.fname} {studentName.lname}</Text>
      <Text>Student email : {studentName.email}</Text>
      <Text>Subject : {subject}</Text>
      <Text>Description: {description}</Text>
      <Text>Fees : {fees}</Text>
      <Box>
      <Button colorScheme='gray' variant='outline' onClick={()=>{clickHandle();setRequestId(id)}} >
    Send Proposal
  </Button>
      </Box>
    </AccordionPanel>
    </AccordionItem>
 
    </>
  )
}

export default AllReq
