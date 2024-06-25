import React, { useState, useEffect } from 'react';
import { addContactToSupplier } from '../services/contactService';
import { getSuppliers } from '../services/supplierService';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const supplierList = await getSuppliers();
      setSuppliers(supplierList);
    };

    fetchSuppliers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      name,
      email,
      number,
      supplierId,
    };

    console.log(contactData + " spy"); 

    const contactId = await addContactToSupplier(contactData);

    console.log(`Contact added with ID: ${contactId}`);

    setName('');
    setEmail('');
    setSupplierId('');
    
    window.location.reload();
  };

  return (
    <div class="gridForm">
      <div class="ColoredBox">
        <h2 className='boxText'>Register Contact</h2>
      </div>
      <form onSubmit={handleSubmit} class="gridPosition">
        <input placeholder='Name:' class="inputStyle" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder='Email:' class="inputStyle" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input placeholder='Phone Number:' class="inputStyle" type="number" value={number} onChange={(e) => setNumber(e.target.value)} required />
        <select className='inputStyle' value={supplierId} onChange={(e) => setSupplierId(e.target.value)} required>
          <option value="">Select Supplier</option>
          {suppliers.map(supplier => (
            <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
          ))}
        </select>
        <br />
        <button class="ColoredBox" type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export default ContactForm;