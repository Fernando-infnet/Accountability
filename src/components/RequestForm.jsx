import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/productsService';
import { addRequests } from '../services/requestService';

import useAuth from '../hooks/useAuth';

const RequestForm = () => {

  const { user , isAdmin } = useAuth();

  const userUid = user ? user.uid : null;
  const userMail = user ? user.email : null;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [productId, setProductId] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProducts();
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name !== '', productId !== null, userUid !== undefined, userMail !== undefined){
      await addRequests({ productId, description, userUid, userMail});
    }
    setName('');
    setDescription('');
  };

  return (
    <div class="gridForm"> 
        <div class="ColoredBox">
            <h2 className='boxText'>Registre Requisição de Compra</h2>
        </div>
        <form onSubmit={handleSubmit}  class="gridPosition">
        <select className='inputStyle' value={productId} onChange={(e) => setProductId(e.target.value)} required>
          <option value="">Selecione o Produto</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
        <input 
        class="inputStyle"
            type="text" 
            placeholder="Informação adicional opcional sobre a requisição" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
        />
        <button class="ColoredBox" type="submit">Prosseguir</button>
        </form>
    </div>
    
  );
};

export default RequestForm;