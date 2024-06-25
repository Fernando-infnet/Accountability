import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdMenu } from "react-icons/io";


const NavigationBar = () => {
  return (
    <nav class="navbar navbarStyle">
        <div class="container-fluid">
            <Navbar.Toggle>
                <IoMdMenu className="custom-menu-icon" size={30}></IoMdMenu>
            </Navbar.Toggle>
            <a class="navbar-brand title" href="#">ACCOUNTABILITY</a>
            <FaUserCircle size={30}></FaUserCircle>
        </div>
        <div class="navigation">
            <a>For you</a>
            <a>Recommended</a>
            <a>Popular</a>
        </div>
    </nav>
  );
};

export default NavigationBar;