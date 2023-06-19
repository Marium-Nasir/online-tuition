import React, { useContext, useState, useEffect } from "react";
import { InfoContext } from "../../Context/InfoProvider";
import { Box, useToast } from "@chakra-ui/react";
import ReqCard from "./ReqCard";
import axios from "axios";

const StudentContent = () => {
  const { user, stuReq, setstuReq } = useContext(InfoContext);
  const toast = useToast();
  const fetchAllReq = async()=>{
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/user/getallrequests", config);
      console.log(data);
      setstuReq(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchAllReq();
  }, [fetchAllReq]);
  return (
    <>
      <Box
        width={"100%"}
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={'space-between'}
        // p={5}
        // mt={2}
        border={"2px solid white"}
      >
        {stuReq.map((val) =>{ 
          return(
          <ReqCard
            requestId={val._id}
            reqName={val.reqName}
            description={val.description}
            fees={val.fees}
            subject={val.subject}
            user={user}
          />
          )}
        )}
      </Box>
    </>
  );
};

export default StudentContent;
