import React, { useEffect, useState } from 'react';
import { getSuppliers , deleteSupplierById } from '../services/supplierService';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const supplierList = await getSuppliers();
      setSuppliers(supplierList);
    };

    fetchSuppliers();
  }, []);

  const handleDelete = async (id) => {
    console.log(id)
    try {
        await deleteSupplierById(id);
        setSuppliers((e) =>
            e.filter((supplier) => supplier.id !== id)
        );
    } 
    catch(error) {
        console.error(`Error deleting supplier with ID ${id}:`, error);
    }
  }

  return (
    <div>
      {suppliers.map(supplier => (
        <div style={{display : 'flex', justifyContent: 'center'}} key={supplier.id}>
          <div class="card mt-3 mb-3">
                <div class="card-body">
                    <h5 class="card-title">Nome: {supplier.name}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Endereço:</strong> {supplier.address}</li>
                </ul>
                <button
                className="btn btn-danger m-3 p-3"
                onClick={() => handleDelete(supplier.id)}
                >
                    Deletar
                </button>
            </div>
        </div>
      ))}
    </div>
  );
};

export default SupplierList;