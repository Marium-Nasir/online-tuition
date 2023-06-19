import React from 'react';
import {Box,Tabs,TabList,Tab,TabPanels,TabPanel,Text,Container} from '@chakra-ui/react'
import Signup from '../Components/Authentication/Signup';
import Login from '../Components/Authentication/Login';

const Home = () => {
  return (
    <>
       <Container>
      <Box
        d="flex"
        justifyContent="center"
        alignItems={'center'}
        border="3px solid white"
        borderRadius=".5rem"
        textAlign="center"
        w="100%"
        p={2}
        boxSizing="border-box"
        borderBottom={'none'}
      >
        <Text
          fontFamily="Playfair Display"
          fontSize="4xl"
          textDecoration='underline'
          textAlign={'center'}
          color={'white'}
        >
         Online Tuition
        </Text>
      </Box>
      <Box
        d="flex"
        justifyContent="center"
        border="3px solid white"
        borderRadius=".5rem"
        textAlign="center"
        w="100%"
        p={2}
        boxSizing="border-box"
        // mt="20px"
        borderTop={'none'}
      >
        <Tabs variant="soft-rounded" colorScheme="gray">
          <TabList mb={'1em'}>
            <Tab w="50%" color="white" fontSize={"20px"}>Login</Tab>
            <Tab w="50%" color="white" fontSize={"20px"}>Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
    </>
  )
}

export default Home
