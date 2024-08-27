import React from 'react';
import NavigationBar from '../components/navbar';
import SupplierList from '../components/SupplierList';

const SuppliersPage = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-5">
        <SupplierList></SupplierList>
      </div>
    </div>
  );
};

export default SuppliersPage;