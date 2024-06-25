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
          <div class="card mt-3 mb-3">
                <div class="card-body">
                    <h5 class="card-title">Name: {supplier.name}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Endereço:</strong> {supplier.address}</li>
                </ul>
            </div>
        </div>
      ))}
    </div>
  );
};

export default SupplierList;