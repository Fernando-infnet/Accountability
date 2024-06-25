import React from 'react';
import NavigationBar from '../components/navbar';
import SupplierForm from '../components/SupplierForm';
import SupplierList from '../components/SupplierList';

const Suppliers = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-5">
        Suppliers
        <SupplierForm></SupplierForm>
        <SupplierList></SupplierList>
      </div>
    </div>
  );
};

export default Suppliers;