import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../Components/StudentPageComponents/Navbar";
import StudentContent from "../Components/StudentPageComponents/StudentContent";

const StudentPage = () => {
  return (
    <>
      <Box
        height={"100%"}
        width={"100%"}
        display={"flex"}
        flexDirection={'column'}
        // justifyContent={"center"}
      >
        <Navbar />
        <StudentContent/>
      </Box>
    </>
  );
};

export default StudentPage;
