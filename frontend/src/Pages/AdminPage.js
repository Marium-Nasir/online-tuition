import React from 'react';
import {Box,Button} from '@chakra-ui/react';
import AdminNav from '../Components/AdminPage/AdminNav';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  // const data = localStorage.getItem('user-info')
  // if(data){
  //   window.location.href = '/admin'
  // }else{
  //   window.location.href = '/'
  // }
  const Navigate = useNavigate()
  return (
    <>
     {/* <Box
    //  height={'100%'}
     width={'100%'}
     display={'flex'}
     flex={'row'}
     justifyContent={'center'}
     > */}
     <AdminNav/>
    
     {/* </Box> */}
    </>
  )
}

export default AdminPage
