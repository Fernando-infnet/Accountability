import React, { useState, useEffect } from 'react';
import { addProducts } from '../services/productsService';
import { getSuppliers } from '../services/supplierService';


const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

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
    if(name !== '', description !== '', supplierId !== null){
      await addProducts({ name, description, supplierId });
    }
    setName('');
    setDescription('');
    setSupplierId('');
    window.location.reload();
  };

  return (
    <div class="gridForm"> 
        <div class="ColoredBox">
            <h2 className='boxText'>Registre Produto</h2>
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
            placeholder="Descrição" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
        />
        <select className='inputStyle' value={supplierId} onChange={(e) => setSupplierId(e.target.value)} required>
          <option value="">Selecione o Fornecedor</option>
          {suppliers.map(supplier => (
            <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
          ))}
        </select>
        <button class="ColoredBox" type="submit">Prosseguir</button>
        </form>
    </div>

  );
};

export default ProductForm;