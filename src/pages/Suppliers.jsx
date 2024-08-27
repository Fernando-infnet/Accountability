import React from 'react';
import NavigationBar from '../components/navbar';
import SupplierForm from '../components/SupplierForm';
import SupplierList from '../components/SupplierList';

import { Link } from 'react-router-dom';

const Suppliers = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-5">
        <SupplierForm></SupplierForm>
      </div>
      <div className='mt-5'>
          <Link to="/SuppliersPage"><h3><strong>Lista de Fornecedores</strong></h3></Link>
      </div>
    </div>
  );
};

export default Suppliers;