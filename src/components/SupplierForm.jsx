import React, { useState } from 'react';
import { addSupplier } from '../services/supplierService';
import { db } from '../firebase'; 
import { collection, addDoc } from 'firebase/firestore';

const SupplierForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSupplier({ name, address });
    setName('');
    setAddress('');
    window.location.reload();
  };

  return (
    <div class="gridForm"> 
        <div class="ColoredBox">
            <h2 className='boxText'>Register Supplier</h2>
        </div>
        <form onSubmit={handleSubmit}  class="gridPosition">
        <input 
        class="inputStyle"
            type="text" 
            placeholder="Supplier Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
        />
        <input 
        class="inputStyle"
            type="text" 
            placeholder="Supplier Address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
        />
        <button class="ColoredBox" type="submit">Add Supplier</button>
        </form>
    </div>

  );
};

export default SupplierForm;