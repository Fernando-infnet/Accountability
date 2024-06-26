import React, { useState, useEffect } from 'react';
import { addProducts } from '../services/priceService';
import { getSuppliers } from '../services/supplierService';
import { getProducts } from '../services/productsService';

const PriceForm = () => {
  const [price, setPrice] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [productId, setProductId] = useState([]);
  const [products, setProducts] = useState([]);


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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      price,
      supplierId,
      productId,
    };

    console.log(productData + " spy"); 

    const productInfo = await addProducts(productData);

    console.log(`Contact added with ID: ${productInfo}`);

    setPrice('');
    setSupplierId('');
    setProductId('');
    
    window.location.reload();
  };

  return (
    <div class="gridForm">
      <div class="ColoredBox">
        <h2 className='boxText'>Register Contact</h2>
      </div>
      <form onSubmit={handleSubmit} class="gridPosition">
        <input placeholder='Price:' class="inputStyle" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <select className='inputStyle' value={supplierId} onChange={(e) => setSupplierId(e.target.value)} required>
          <option value="">Select Supplier</option>
          {suppliers.map(supplier => (
            <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
          ))}
        </select>
        <select className='inputStyle' value={productId} onChange={(e) => setProductId(e.target.value)} required>
          <option value="">Select Supplier</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
        <br />
        <button class="ColoredBox" type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export default PriceForm;