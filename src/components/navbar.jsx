import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdMenu } from "react-icons/io";
import { Link } from 'react-router-dom';


const NavigationBar = () => {
  return (
    <nav class="navbar navbarStyle">
        <div class="container-fluid">
            <Navbar.Toggle>
                <IoMdMenu className="custom-menu-icon" size={30}></IoMdMenu>
            </Navbar.Toggle>
            <Link class="navbar-brand title" to={"/"}>ACCOUNTABILITY</Link>
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