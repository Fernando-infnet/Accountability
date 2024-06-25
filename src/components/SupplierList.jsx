import React, { useEffect, useState } from 'react';
import { getSuppliers } from '../services/supplierService';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const supplierList = await getSuppliers();
      setSuppliers(supplierList);
    };

    fetchSuppliers();
  }, []);

  return (
    <div>
      {suppliers.map(supplier => (
        <div key={supplier.id}>
          <h2>Nome Do Fornecedor: {supplier.name}</h2>
          <p>Endereço Do Fornecedor: {supplier.address}</p>
        </div>
      ))}
    </div>
  );
};

export default SupplierList;