import React from 'react';
import NavigationBar from '../components/navbar';
import { Link } from 'react-router-dom';

import Suppliers from './Suppliers';

const LandingPage = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-5">
        <h1>Accountability Main Page</h1>
        <p>Follow for CRUD manipulation:</p>
        <div class="links">
          <Link to="/Suppliers"><strong>Suppliers</strong></Link>
          <Link to="/Contacts"><strong>Contacts</strong></Link>
          <Link to="/Products"><strong>Products</strong></Link>
          <Link to="/Price"><strong>Price</strong></Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;