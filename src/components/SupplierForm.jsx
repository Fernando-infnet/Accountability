import React, { useState } from 'react';
import { addSupplier } from '../services/supplierService';

const SupplierForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSupplier({ name, address });
    setName('');
    setAddress('');
  };

  return (
    <div class="gridForm"> 
        <div class="ColoredBox">
            <h2 className='boxText'>Registre Fornecedor</h2>
        </div>
        <form onSubmit={handleSubmit}  class="gridPosition">
        <input 
        class="inputStyle"
            type="text" 
            placeholder="Nome" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
        />
        <input 
        class="inputStyle"
            type="text" 
            placeholder="Endereço" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
        />
        <button class="ColoredBox" type="submit">Prosseguir</button>
        </form>
    </div>

  );
};

export default SupplierForm;