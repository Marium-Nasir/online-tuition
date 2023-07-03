import React,{useContext} from 'react';
import { InfoContext } from "../Context/InfoProvider";
import { Navigate, Outlet } from 'react-router-dom';

const Layout = () => {
const { user } = useContext(InfoContext);
return user ? <Outlet /> : <Navigate to={'/'} replace/>
}

export default Layout
