import React, { useState } from 'react';
import { addProducts } from '../services/productsService';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProducts({ name, description });
    setName('');
    setDescription('');
    window.location.reload();
  };

  return (
    <div class="gridForm"> 
        <div class="ColoredBox">
            <h2 className='boxText'>Register Product</h2>
        </div>
        <form onSubmit={handleSubmit}  class="gridPosition">
        <input 
        class="inputStyle"
            type="text" 
            placeholder="Product Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
        />
        <input 
        class="inputStyle"
            type="text" 
            placeholder="Product Descrição" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
        />
        <button class="ColoredBox" type="submit">Add Product</button>
        </form>
    </div>

  );
};

export default ProductForm;