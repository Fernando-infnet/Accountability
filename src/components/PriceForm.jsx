import React, { useState, useEffect } from 'react';
import { addProducts } from '../services/priceService';
import { getSuppliers } from '../services/supplierService';
import { getProducts } from '../services/productsService';
import { getRequests } from '../services/requestService';

const PriceForm = () => {
  const [price, setPrice] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [productId, setProductId] = useState([]);
  const [products, setProducts] = useState([]);

  const [requestId, setRequestId] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const supplierList = await getSuppliers();
      setSuppliers(supplierList);
    };

    fetchSuppliers();

    const fetchProducts = async () => {
        const productList = await getProducts();
        setProducts(productList);
      };

    fetchProducts();

    const fetchRequests = async () => {
      const requestList = await getRequests()
      setRequests(requestList)
    };

    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    console.log(requestId)
    e.preventDefault();

    const productData = {
      price,
      supplierId,
      requestId,
    };

    const productInfo = await addProducts(productData);

    console.log(`Contact added with ID: ${productInfo}`);

    setPrice('');
    setSupplierId('');
    setProductId('');
    setRequestId('');
    };

  return (
    <div class="gridForm">
      <div class="ColoredBox">
        <h2 className='boxText'>Adicione Cotação</h2>
      </div>
      <form onSubmit={handleSubmit} class="gridPosition">
        <input placeholder='Preço:' class="inputStyle" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <select className='inputStyle' value={supplierId} onChange={(e) => setSupplierId(e.target.value)} required>
          <option value="">Selecione o Fornecedor</option>
          {suppliers.map(supplier => (
            <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
          ))}
        </select>
        <select className='inputStyle' value={requestId} onChange={(e) => setRequestId(e.target.value)} required>
          <option value="">Selecione a Requisição de Compra</option>
          {requests.map(request => {
            const product = products.find((t) => t.id === request.productId);
            
            return (
              <option key={request.id} value={request.id}>
                {product ? product.name : 'Produto não encontrado'}
              </option>
            );
          })}
        </select>
        <br />
        <button class="ColoredBox" type="submit">Prosseguir</button>
      </form>
    </div>
  );
};

export default PriceForm;