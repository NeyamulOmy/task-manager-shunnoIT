import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import SideBar from './SideBar';

const DashBoard = () => {
    return (
        <div>
            <Header></Header>
            <div className='d-flex justify-space-between'>
                <SideBar></SideBar>
                <Outlet />
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashBoard;