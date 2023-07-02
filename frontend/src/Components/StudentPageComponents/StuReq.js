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

const StuReq = ({reqName,studentName,subject,description,fees,setRequestId,id,requestId,getAllProForStu,dltRequest,onOpen}) => {
    console.log("from compo "+requestId);
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
      <Button mr={2} colorScheme='gray' variant='outline' onClick={()=>{onOpen();setRequestId(id)}} >
    Update 
  </Button>
      <Button mr={2} colorScheme='gray' variant='outline' onClick={()=>{setRequestId(id);getAllProForStu()}} >
    Show Proposals 
  </Button>
        <Button colorScheme='red' variant='outline' onClick={()=>{setRequestId(id);dltRequest()}}>
        Delete
    </Button>
      </Box>
    </AccordionPanel>
    </AccordionItem>
    </>
  )
}

export default StuReq
