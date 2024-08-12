import React, { useEffect, useState } from 'react';
import { getPricesByProduct } from '../services/priceService';
import { getSupplierById } from '../services/supplierService';

const ProductPrices = ({ productId }) => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [supplierNames, setSupplierNames] = useState({});

  useEffect(() => {
    const fetchSupplierNames = async () => {
      const names = {};
      for (const price of prices) {
        try {
          const supplier = await getSupplierById(price.supplierId);
          names[price.supplierId] = supplier.name;
        } catch (error) {
          console.error(`Error fetching supplier with ID ${price.supplierId}:`, error);
          names[price.supplierId] = 'Supplier not found';
        }
      }
      setSupplierNames(names);
    };

    fetchSupplierNames();
  }, [prices]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const fetchedPrices = await getPricesByProduct(productId.id);
        setPrices(fetchedPrices);
      } catch (error) {
        console.error('Error fetching prices:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId.id) {
      fetchPrices();
    }
  }, [productId]);

  if (loading) {
    return <p>Carregando preços...</p>;
  }

  if (prices.length === 0) {
    return <p>Ainda não há preços para esse produto</p>;
  }

  return (
    <div>
      <h3>Preços de: {productId.name}</h3>
      <ul>
        {prices.map(price => (
          <li key={price.id}>
             Name: {supplierNames[price.supplierId] || 'Carregando...'} , Preço: ${price.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPrices;