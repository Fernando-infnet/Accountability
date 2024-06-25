import React, { useState } from 'react';
import { addSupplier } from '../services/supplierService';
import { db } from '../firebase'; // Assuming you have exported db from your firebase.js
import { collection, addDoc } from 'firebase/firestore';

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
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Supplier Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Supplier Address" 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
      />
      <button type="submit">Add Supplier</button>
    </form>
  );
};

export default SupplierForm;