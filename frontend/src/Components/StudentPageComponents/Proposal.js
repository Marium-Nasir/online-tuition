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

const Proposal = ({
    tutorName,
    requestId,
    description,
    fees,
    setproposalId,
    id,
    backToRequest,
    proposalId
}) => {
  return (
    <>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left" fontWeight={"bold"}>
              {requestId.subject}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Text fontWeight={"bold"}>
            Tutor Name : {tutorName.fname} {tutorName.lname}
          </Text>
          <Text>Tutor email : {tutorName.email}</Text>
          <Text>Description: {description}</Text>
          <Text>Fees : {fees}</Text>
          <Box>
            <Button
              colorScheme="gray"
              variant="outline"
              onClick={() => {
                backToRequest()
              }}
            >
              Back
            </Button>
            <Button
              colorScheme="gray"
              variant="outline"
              onClick={() => {
                setproposalId(id);
              }}
            >
              Accept
            </Button>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </>
  )
}

export default Proposal
