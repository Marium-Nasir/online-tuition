import React from 'react';
import { isLoggedIn } from './Authentication/AuthUser';
import { Navigate, Outlet } from 'react-router-dom';

const Layout = () => {
 return isLoggedIn()?<Outlet />:<Navigate to={'/'}/>
}

export default Layout
